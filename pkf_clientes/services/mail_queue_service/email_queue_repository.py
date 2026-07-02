from datetime import datetime, timedelta, timezone
from odoo.api import Environment
from odoo.fields import Datetime
from odoo.models import BaseModel

from .models import Context
from .utils import render_body


class EmailQueueRepository:

    def __init__(self, env: Environment):
        self.env = env

    def unlock_queue(self):
        queue = self.env["pkf.email.queue"]

        limit_date = Datetime.to_string(
            datetime.now(timezone.utc) - timedelta(minutes=30)
        )

        stuck = queue.search(
            [
                ("state", "=", "processing"),
                ("processing_date", "<", limit_date),
            ]
        )

        if stuck:
            stuck.write(
                {
                    "state": "ready",
                }
            )

    def get_ready(self) -> list["BaseModel"]:
        queue = self.env["pkf.email.queue"]

        emails = queue.search(
            [("state", "=", "ready")],
            limit=5,
        )

        if not emails:
            return

        emails.write(
            {
                "state": "processing",
                "processing_date": Datetime.now(),
            }
        )

        self.env.cr.commit()

        return emails

    def create_queue(self, ctx: Context, email_cc):
        return self.env["pkf.email.queue"].create(
            {
                "subject": ctx.subject,
                "email_to": ctx.emails,
                "email_cc": email_cc or False,
                "body_html": render_body(ctx),
                "state": "ready",
                "attachment_ids": [(6, 0, ctx.attachment_ids)],
            }
        )
