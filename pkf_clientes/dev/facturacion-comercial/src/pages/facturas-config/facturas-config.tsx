import { AppContainer } from "@/widgets";
import { useFacturasConfig } from "./hooks";

export function FacturasConfig() {
  const { form, saveValues } = useFacturasConfig();

  return (
    <AppContainer>
      <div className="container">
        <div className="row">
          <div className="col">
            <header className="d-flex justify-content-between align-items-center mt-3 mb-3">
              <h4>Configuraciones</h4>
              <button className="btn btn-primary" onClick={saveValues}>
                <i className="fa fa-floppy-disk"></i>
                Guardar
              </button>
            </header>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="bg-white mb-3 rounded shadow">
              <div className="container pt-2 pb-2 ">
                <div className="row">
                  <div className="col-12 col-sm-4 col-md-3">
                    <label htmlFor="contpaqi_api_url" className="form-label">
                      Contpaqi API Url
                    </label>
                    <input
                      type="url"
                      className="form-control"
                      value={form.data.contpaqi_api_url ?? ""}
                      onChange={form.handleChange}
                      name="contpaqi_api_url"
                      id="contpaqi_api_url"
                      placeholder="http://localhost:7252"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppContainer>
  );
}
