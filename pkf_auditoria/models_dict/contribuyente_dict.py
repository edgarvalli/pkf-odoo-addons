from typing import TypedDict


class ContribuyenteDict(TypedDict):
    rfc: str
    nombre: str
    situacion: str

    # Presuntos
    oficio_presunto_sat: str
    publicacion_presunto_sat: str
    oficio_presunto_dof: str
    publicacion_presunto_dof: str

    # Desvirtuados
    oficio_desvirtuado_sat: str
    publicacion_desvirtuado_sat: str
    oficio_desvirtuado_dof: str
    publicacion_desvirtuado_dof: str

    # Definitivos
    oficio_definitivo_sat: str
    publicacion_definitivo_sat: str
    oficio_definitivo_dof: str
    publicacion_definitivo_dof: str

    # Sentencia favorable
    oficio_sentencia_favorable_sat: str
    publicacion_sentencia_favorable_sat: str
    oficio_sentencia_favorable_dof: str
    publicacion_sentencia_favorable_dof: str
