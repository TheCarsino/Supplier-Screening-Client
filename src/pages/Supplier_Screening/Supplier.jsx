import NavBar from "../../components/NavBar/NavBar";
import MainContainer from "../../components/Main/MainContainer";
export default function Supplier() {
  return (
    <>
      <div className="app-navbar">
        <NavBar />
      </div>
      <div className="app-component bg-white">
        <MainContainer title="Lista de Riesgos">
          <div>Supplier</div>
        </MainContainer>
      </div>
    </>
  );
}
