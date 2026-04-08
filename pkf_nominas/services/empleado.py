from dataclasses import dataclass
from odoo.orm.environments import Environment
from typing import Optional, TYPE_CHECKING

if TYPE_CHECKING:
    from ev_contpaqi.types.empleado_type import EmpleadoDict
else:
    from odoo.addons.ev_contpaqi.types.empleado_type import EmpleadoDict


@dataclass
class Empleado:
    env: Environment
    idempleado: Optional[int] = None

    def _get_id_contpaqi(self):
        uid = self.idempleado or self.env.uid
        domain = [("user_id", "=", uid)]
        euser = self.env["hr.employee"].search(domain, limit=1)
        if not euser:
            raise ValueError("Empleado no encontrado")

        return euser.ev_idempleado

    def _get_data_empleado(self) -> EmpleadoDict:
        try:
            idempleado = self._get_id_contpaqi()
            empleado = self.env["ev.contpaqi.nominas"].buscar_empleado_id(idempleado)

            if not empleado:
                raise ValueError("No se encontro el empleado en contpaqi.")

            return empleado

        except Exception as e:
            raise ValueError(
                f"Ocurrio un error al buscarlos datos del empleado en contpaqi: {str(e)}"
            )

    def get_empleado(self):
        return self._get_data_empleado()

    def get_comprobantes(self, **kwargs):
        with_metadata = kwargs.pop("metadata", False)
        try:
            empleado = self._get_data_empleado()
            params = {"idempleado": empleado.pop("id"), **kwargs}
            comprobantes = self.env["ev.contpaqi.nominas"].comprobantes(**params)
            if with_metadata:
                return {"comprobantes": comprobantes, "empleado": empleado}

            return comprobantes

        except Exception as e:
            raise ValueError(f"Ocurrio un error al buscar los comprobantes: {str(e)}")
