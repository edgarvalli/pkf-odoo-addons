import { SaldosModal } from "@/components";
import { GridCard } from "./GridCard";
import { useASContext } from "../hooks/useASContext";

export function ASHeader() {
  const {
    today,
    showModal,
    saldoFiltered,
    handleClickCard,
    setShowModal,
    totalVencido30,
    vencido,
    saldoTotalPendiente,
    totalVencido,
    saldoVigente,
    totalFacturas,
    totalClientes,
    totalVencido60,
  } = useASContext();
  return (
    <header>
      <h3>Antiguedad de Saldos</h3>
      <span className="text-muted">Reporte actualizado al {today}</span>
      <div className="mt-2 saldo-grid">
        <GridCard
          title="Saldo Total"
          value={saldoTotalPendiente}
          formatNumber
        />
        <GridCard title="Cartera Vencida" value={vencido} formatNumber />
        <GridCard title="Clientes" value={totalClientes} />
        <GridCard title="Facturas" value={totalFacturas} />
        <GridCard
          title="Saldo Vigente"
          value={saldoVigente}
          formatNumber
          onClick={() => handleClickCard("VIGENTE")}
        />
        <GridCard
          title="Vencido 30"
          value={totalVencido30}
          formatNumber
          onClick={() => handleClickCard("VENCIDO30")}
        />
        <GridCard
          title="Vencido 60"
          value={totalVencido60}
          formatNumber
          onClick={() => handleClickCard("VENCIDO60")}
        />
        <GridCard
          title="Vencido 90"
          value={totalVencido}
          formatNumber
          onClick={() => handleClickCard("VENCIDO")}
        />
      </div>
      <SaldosModal
        show={showModal}
        onClose={() => setShowModal(false)}
        tableProps={{ tableId: "saldos-table-as", saldos: saldoFiltered }}
        headerProps={{}}
      />
    </header>
  );
}
