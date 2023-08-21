import React from "react";
import {
  GET_MEDICATION,
  GET_MEDICATIONS,
  UPDATE_MEDICATION,
  DELETE_MEDICATION,
  POST_MEDICATION,
} from "./Api";
import { useNavigate } from "react-router-dom";
export const UserContext = React.createContext();

export const GetMedicationData = ({ children }) => {
  const navigate = useNavigate();
  const [medicationData, setMedicationData] = React.useState(null);
  const [allMedications, setAllMedications] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  async function getMedicationById(id) {
    try {
      setLoading(true);
      setError(false);
      const { url, options } = GET_MEDICATION(id);
      const response = await fetch(url, options);
      if (!response) throw new Error("Algo deu errado ao buscar os dados");
      const json = await response.json();
      setMedicationData(json);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
      navigate("/calculate");
    }
  }

  async function getMedicationsData() {
    try {
      setLoading(true);
      const { url, options } = GET_MEDICATIONS();
      const response = await fetch(url, options);
      if (!response) throw new Error("Algo deu errado...");
      const json = await response.json();
      setAllMedications(json);
    } catch (err) {
      window.alert(err);
    } finally {
      setLoading(false);
    }
  }

  async function updateMedication(id, updatedMedicationData) {
    try {
      setLoading(true);
      setError(false);
      const { url, options } = UPDATE_MEDICATION(id, updatedMedicationData);
      const response = await fetch(url, options);
      if (!response)
        throw new Error(
          "Não foi possível atualizar o medicamento, tente novamente."
        );
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
      navigate("/table");
    }
  }

  async function deleteMedication(id) {
    try {
      setLoading(true);
      setError(false);
      const { url, options } = DELETE_MEDICATION(id);
      const response = await fetch(url, options);
      if (!response)
        throw new Error(
          "Não foi possível excluir o medicamento, tente novamente."
        );
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
      getMedicationsData();
    }
  }

  async function createMedication(medicationData) {
    try {
      setLoading(true);
      const { url, options } = POST_MEDICATION(medicationData);
      const response = await fetch(url, options);
      if (!response)
        throw new Error("Algo deu errado ao cadastrar, tente novamente.");
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
      navigate("/table");
    }
  }

  return (
    <UserContext.Provider
      value={{
        getMedicationById,
        medicationData,
        getMedicationsData,
        allMedications,
        updateMedication,
        deleteMedication,
        createMedication,
        loading,
        error,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
