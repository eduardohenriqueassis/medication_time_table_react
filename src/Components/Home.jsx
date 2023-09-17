import React from "react";
import styles from "./Home.module.css";
import Button from "./Elements/Button";
import { useNavigate } from "react-router-dom";
import Head from "./Head";

const Home = () => {
  const navigate = useNavigate();
  function handleClick(event) {
    event.preventDefault();
    const isCreate = true;
    navigate("/calculate", { state: { isCreate: isCreate } });
  }

  return (
    <div className={`container`}>
      <Head
        title="Home"
        description="Calcule os horários dos seus medicamentos sem se preocupar em fazer contas com horas e dias."
      />
      <main className={styles.main}>
        <h1>Home - Calcule os horários dos seus remédios</h1>
        <p>
          Aqui você pode calcular seus horários de remédios sem se preocupar em
          ter que fazer contas.
        </p>
        <div className={styles.btnWrapper}>
          <Button onPress={handleClick}>Cadastrar Medicamento</Button>
          <Button onPress={() => navigate("/table")}>Sua Tabela</Button>
        </div>
      </main>
    </div>
  );
};

export default Home;
