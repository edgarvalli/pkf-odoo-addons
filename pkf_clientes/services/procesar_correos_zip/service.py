from odoo.api import Environment
from .parser import parse_zip_to_client
from .mail_service import MailService


class ProcesarCorreosZip:

    def __init__(self, env: Environment):
        self.mail_service = MailService(env)

    def procesar(
        self,
        file_content: bytes,
        email_cc: str,
        document_type: str,
        send_to_client=True,
    ):
        clients = parse_zip_to_client(file_content)
        self.mail_service.schedule_emails(
            clients, email_cc, document_type, send_to_client
        )
        return True
