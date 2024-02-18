import axios from "axios";
import { useEffect, useState } from "react";

const [alerta, setAlerta] = useState([]);

useEffect(()  => {
   axios
      .get("http://localhost:8080/alertas")
      .then((response) => setAlerta(response.data))
   //    .then((response) => {
   //        return response.data)
   //    })
      .catch((error) => console.log(error))
      .finally;
  }, []);
  
export default function useAlerta() {


     return alerta

   }