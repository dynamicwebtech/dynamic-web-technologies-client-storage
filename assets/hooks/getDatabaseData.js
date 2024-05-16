/**
 *
 *  This is the getDatabaseData hook
 *
 */

import { useState, useEffect } from "react";

import { fetchClients } from "../functions/async/fetchers/fetchClients";
import { fetchProjects } from "../functions/async/fetchers/fetchProjects";

const getDatabaseData = () => {
  const [clients, setClients] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchClients("/api/getClients", setClients);
    fetchProjects("/api/getProjects", setProjects);
  }, []);

  return { clients, projects };
};

export default getDatabaseData;
