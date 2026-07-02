import time
import random
from odoo.api import Environment
from odoo.fields import Datetime

from .utils import logger
from .mailer import Mailer
from .types import LogDict
from .models import Context, Email
from .context_builder import ContextBuilder
from .email_repository import EmailRepository
from .attachment_builder import AttachmentBuilder
from .email_queue_repository import EmailQueueRepository


class MailQueueService:

    def __init__(self, env: Environment):
        self.env = env
        self.emailrepo = EmailRepository(env)
        self.queuerepo = EmailQueueRepository(env)

    def log(self, log: LogDict):
        logger(self.env, log)

    def process_and_create_queue(self, zip_bytes, send_to_client=False, email_cc=None):

        with AttachmentBuilder(self.env) as attach:
            attachments = attach.build(zip_bytes)

        ctx_list = ContextBuilder.context_mapper(attachments)

        if not ctx_list:
            return

        uuids = list(ctx_list.keys())
        email_map = self.emailrepo.get_map(uuids)

        for ctx in ctx_list.values():
            self._process_single_context(
                ctx,
                email_map,
                send_to_client,
                email_cc,
            )

    def process_queue(self):

        with Mailer() as mailer:

            for email in self.queuerepo.get_ready():

                try:
                    mailer.build_email(email).send()

                    email.write(
                        {
                            "state": "sent",
                            "date_sent": Datetime.now(),
                            "error_notes": False,
                        }
                    )

                    self.env.cr.commit()

                    self.log(
                        {
                            "uid": email.id,
                            "client": email.email_to,
                            "status": "ok",
                            "event": ("Correo enviado " "correctamente."),
                        }
                    )

                    time.sleep(random.uniform(2, 5))

                except Exception as e:

                    email.write(
                        {
                            "state": "error",
                            "error_notes": str(e),
                        }
                    )

                    self.env.cr.commit()

                    self.log(
                        {
                            "uid": email.id,
                            "client": email.email_to,
                            "status": "error",
                            "event": (f"Fallo al enviar " f"correo: {str(e)}"),
                        }
                    )

    def _set_emails_clients(self, ctx: Context, email_map: dict[str, Email]):

        uuid = ctx.uuid
        row = email_map.get(uuid)

        if not row or not row.emails:
            self.log(
                {
                    "uid": uuid,
                    "client": ctx.razon_social,
                    "status": "error",
                    "event": ("No se encontraron correos " "en CONTPAQi"),
                }
            )
            return

        ctx.emails = row.emails
        ctx.idcliente = row.idcliente or 0

    def _process_single_context(
        self,
        ctx: Context,
        email_map: dict[str, Email],
        send_to_client,
        email_cc,
    ):

        uuid = ctx.uuid

        if send_to_client:
            self._set_emails_clients(ctx, email_map)
        else:
            ctx.emails = self.env.user.email or ""

        if not ctx.emails:

            self.log(
                {
                    "uid": uuid,
                    "client": ctx.razon_social,
                    "status": "error",
                    "event": ("Destinatario final vacío"),
                }
            )

            return

        return self.queuerepo.create_queue(ctx, email_cc)
