import React, { useEffect, useState } from "react";
import { Typography, Paper } from "@mui/material";
import { Link, useLocation, useParams } from "react-router-dom";
import { ADD, header } from "../../../../context/constant";
import { IBrokerForm } from "../IBroker";
import AddBrokerForm from "./addBrokerForm";
import getBrokerDetailsService from "../../../../api/Broker/GetBrokerDetails/getBrokerService";
import { convertIBrokerVMToIBrokerForm } from "../../../../api/Broker/convertIBrokerVMToIBrokerForm";

const AddBroker = () => {
  const { brokerId } = useParams();
  const location = useLocation();
  const pathName = location.pathname.split("/");
  const isAdd = pathName[pathName.length - 1] === ADD;
  const [editBrokerDetails, setEditBrokerDetails] = useState<IBrokerForm | undefined>(
    undefined
  );

  useEffect(() => {
    if (!isAdd && brokerId) {
      getBrokerDetailsService({ header, brokerId })
        .then((brokerDetails) => {
          const brokerVMToBrokerForm = convertIBrokerVMToIBrokerForm(brokerDetails);
          setEditBrokerDetails(brokerVMToBrokerForm);
        })
        .catch((error) => {
          console.error("Failed to fetch broker details", error);
        });
    }
  }, [isAdd, brokerId]);

  const title = isAdd ? "Add Broker" : "Update Broker";

  return (
    <div className="bg-blue-200 p-7">
      <Paper
        elevation={3}
        style={{ padding: 20, margin: 30, borderRadius: 10 }}
      >
        <Typography className="text-safekaroDarkOrange" variant="h5">
          {title}
        </Typography>
        <Typography variant="h5" mb={2}>
          <Link to="/dashboard" className="text-addButton font-bold text-sm">
            Dashboard {" / "}
          </Link>
          <Link to="/broker" className="text-addButton font-bold text-sm">
            Brokers /
          </Link>
          <span className="text-grey-600 text-sm"> {title}</span>
          <hr
            className="mt-4"
            style={{ width: "100%", borderColor: "grey-800" }}
          />
        </Typography>

        <AddBrokerForm
          initialValues={{
            id: isAdd ? "0" : editBrokerDetails?.id || "",
            brokerName: isAdd ? "" : editBrokerDetails?.brokerName || "",
            createdBy: "Admin",
          }}
        />
      </Paper>
    </div>
  );
};

export default AddBroker;
