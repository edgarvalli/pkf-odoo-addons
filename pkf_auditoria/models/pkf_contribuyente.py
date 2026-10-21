from odoo import fields, models

from ..services.listado_contribuyentes import ListadoContribuyentes


class PkfContribuyente(models.Model):
    _name = "pkf.contribuyente"
    _description = "Contribuyentes SAT - Artículo 69-B"
    _rec_name = "rfc"
    _order = "id desc"

    # Información del contribuyente
    rfc = fields.Char(string="RFC", required=True, index=True)

    nombre = fields.Char(string="Nombre del contribuyente", required=True, index=True)

    situacion = fields.Selection(
        selection=[
            ("presunto", "Presunto"),
            ("desvirtuado", "Desvirtuado"),
            ("definitivo", "Definitivo"),
            ("sentencia_favorable", "Sentencia favorable"),
        ],
        string="Situación del contribuyente",
        required=True,
        index=True,
    )

    # Presuntos
    oficio_presunto_sat = fields.Char(string="Oficio global de presunción SAT")
    publicacion_presunto_sat = fields.Char(string="Publicación SAT - Presuntos")
    oficio_presunto_dof = fields.Char(string="Oficio global de presunción DOF")
    publicacion_presunto_dof = fields.Char(string="Publicación DOF - Presuntos")

    # Contribuyentes que desvirtuaron
    oficio_desvirtuado_sat = fields.Char(string="Oficio global de desvirtuados SAT")
    publicacion_desvirtuado_sat = fields.Char(string="Publicación SAT - Desvirtuados")
    oficio_desvirtuado_dof = fields.Char(
        string="Oficio global de desvirtuados DOF",
    )
    publicacion_desvirtuado_dof = fields.Char(string="Publicación DOF - Desvirtuados")

    # Definitivos
    oficio_definitivo_sat = fields.Char(string="Oficio global de definitivos SAT")
    publicacion_definitivo_sat = fields.Char(string="Publicación SAT - Definitivos")
    oficio_definitivo_dof = fields.Char(string="Oficio global de definitivos DOF")
    publicacion_definitivo_dof = fields.Char(string="Publicación DOF - Definitivos")

    # Sentencia favorable
    oficio_sentencia_favorable_sat = fields.Char(
        string="Oficio global de sentencia favorable SAT"
    )
    publicacion_sentencia_favorable_sat = fields.Char(
        string="Publicación SAT - Sentencia favorable"
    )
    oficio_sentencia_favorable_dof = fields.Char(
        string="Oficio global de sentencia favorable DOF"
    )
    publicacion_sentencia_favorable_dof = fields.Char(
        string="Publicación DOF - Sentencia favorable"
    )

    _sql_constraints = [
        (
            "rfc_unique",
            "UNIQUE(rfc)",
            "Ya existe un contribuyente registrado con este RFC.",
        ),
    ]

    def sync_sat(self):
        return ListadoContribuyentes(self.env).sync()
