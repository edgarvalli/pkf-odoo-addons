import { Button, Menu, MenuItem } from "@mui/material";
import { useId, useState } from "react";

export function RecibosActions({ iddocumento }: { iddocumento: number }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const buttonId = useId();
  const menuId = useId();
  const open = Boolean(anchorEl);

  const makeDocument = (type = "pdf") => {
    setAnchorEl(null);
    window.open(
      `/pkfmty/api/v1/nominas/recibos/${iddocumento}/crear?type=${type}`,
      "_blank",
    );
  };

  return (
    <div>
      <Button
        id={buttonId}
        aria-controls={open ? menuId : undefined}
        aria-haspopup="true"
        aria-expanded={open}
        onClick={(ev) => setAnchorEl(ev.currentTarget)}
        style={{ fontSize: 12 }}
      >
        Ver Recibos
      </Button>
      <Menu
        id={menuId}
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        slotProps={{ list: { "aria-labelledby": buttonId } }}
      >
        <MenuItem onClick={() => makeDocument("pdf")}>
          <i className="fa fa-file-pdf"></i>
          <span className="ms-2">PDF</span>
        </MenuItem>
        <MenuItem onClick={() => makeDocument("xml")}>
          <i className="fa fa-file"></i>
          <span className="ms-2">XML</span>
        </MenuItem>
      </Menu>
    </div>
  );
}
