import uuid, logging
from odoo.models import AbstractModel

_logger = logging.getLogger(__name__)


class PKFTools(AbstractModel):
    _name = "pkf.tools"
    _description = "PKF Tools"

    prefix = "PKF_TASK"

    def create_job(self, uid: str = None, **args):
        self = self.sudo()

        uid = uid or str(uuid.uuid4())
        taskname = f"{self.prefix}_{uid}"

        values = {
            "name": taskname,
            "interval_number": 1,
            "interval_type": "minutes",
            "interval_number": 1,
            "active": True,
            **args,
        }

        job = self.env["ir.cron"].create(values)

        return job

    def unlink_jobs(self):
        jobs = self.env["ir.cron"].search([("name", "like", self.prefix)])

        for job in jobs:
            _logger.info(f"Removing cron job with id {job.id}")
            job.unlink()

    def remove_current_job(self, uid: str):
        job_name = f"{self.prefix}_{uid}"
        job = self.env["ir.cron"].search([("name", "=", job_name)], limit=1)

        if job:
            _logger.info(f"[PKF_JOB] Removing cron {job.id}")
            job.unlink()
