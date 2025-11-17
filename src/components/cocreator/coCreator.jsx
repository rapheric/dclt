import React, { useState, useMemo } from "react";
import {
  FileText,
  Clock,
  AlertTriangle,
  CheckCircle,
  PlusCircle,
} from "lucide-react";

import { Modal, Select, Input, Button, List, Typography, message } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";


import { useCreateChecklistMutation } from "../../api/checklistApi";
import CheckListPage from "./checklistPage";

const { Option } = Select;

const Hero = () => {
  const [showModal, setShowModal] = useState(false);
  const [createChecklist] = useCreateChecklistMutation();
  const [loanType, setLoanType] = useState("mortgage");

  const NCBA_BLUE = "#3A2A82";

  const cards = [
    {
      title: "Total Checklists",
      value: 3,
      icon: <FileText size={28} className="text-[#3A2A82]" />,
    },
    {
      title: "Pending Review",
      value: 2,
      icon: <Clock size={28} className="text-orange-500" />,
    },
    {
      title: "Pending Deferrals",
      value: 2,
      icon: <AlertTriangle size={28} className="text-yellow-500" />,
    },
    {
      title: "Completed",
      value: 1,
      icon: <CheckCircle size={28} className="text-green-600" />,
    },
  ];

  // ===============================
  // SAVE CHECKLIST
  // ===============================
  const handleSaveChecklist = async (data) => {
    try {
      const payload = {
        loanType: data.loanType,
        applicantName: "Unknown Applicant",
        categories: data.categories,
      };

      await createChecklist(payload).unwrap();
      message.success("Checklist created successfully!");
    } catch (error) {
      console.error("Checklist creation failed:", error);
      message.error("Failed to create checklist");
    }
  };

  // ===============================
  // DOCUMENT CHECKLIST MODAL
  // ===============================
  const DocumentChecklistModal = ({ open, onClose, onSave }) => {
    const [loanType, setLoanType] = useState("");
    const [customDocs, setCustomDocs] = useState([]);
    const [customDocInput, setCustomDocInput] = useState("");

    const defaultDocuments = {
      mortgage: [
        "Proof of income",
        "Credit report",
        "Property appraisal",
        "Identification documents",
      ],
      "Sme loan": [
        "Business financial statements",
        "Asset purchase invoice",
        "Bank statements",
        "Identification documents",
      ],
    };

    const documents = useMemo(() => {
      const defaults = loanType ? defaultDocuments[loanType] : [];
      return [...defaults, ...customDocs];
    }, [loanType, customDocs]);

    const addCustomDoc = () => {
      const trimmed = customDocInput.trim();
      if (!trimmed || documents.includes(trimmed)) return;

      setCustomDocs([...customDocs, trimmed]);
      setCustomDocInput("");
    };

    const deleteDoc = (doc) => {
      setCustomDocs(customDocs.filter((d) => d !== doc));
    };

    const saveModal = () => {
      if (!loanType) {
        message.warning("Please select a loan type");
        return;
      }

      const formattedDocs = documents.map((d) => ({
        name: d,
        status: "",
        comment: "",
        fileUrl: null,
      }));

      onSave({
        loanType,
        categories: [
          {
            title: `${loanType} Required Documents`,
            documents: formattedDocs,
          },
        ],
      });

      onClose();
      setLoanType("");
      setCustomDocs([]);
      setCustomDocInput("");
    };

    return (
      <Modal
        title="Create New Document Checklist"
        open={open}
        onCancel={onClose}
        onOk={saveModal}
        okText="Save Checklist"
        width={600}
      >
        {/* Loan Type Selection */}
        <div className="mb-6">
          <Typography.Text className="block mb-2 text-gray-600 font-semibold">
            Select Loan Type
          </Typography.Text>

         <Select
  value={loanType}
  onChange={setLoanType}
  placeholder={<span style={{ color: "#9CA3AF" }}>Select loan type</span>} 
  style={{ width: "100%", color: "#4B5563" }}
  dropdownStyle={{ color: "#4B5563" }}
>
  <Option value="mortgage" style={{ color: "#4B5563" }}>
    Mortgage
  </Option>
  <Option value="Sme loan" style={{ color: "#4B5563" }}>
    Sme Loan
  </Option>
</Select>

           
        </div>

        {/* Required Documents */}
        <div className="mb-6">
          <Typography.Text className="block mb-2 font-semibold">
            Required Documents
          </Typography.Text>

          <List
            bordered
            dataSource={documents}
            renderItem={(item) => (
              <List.Item className="flex justify-between">
                <span>{item}</span>
                {customDocs.includes(item) && (
                  <DeleteOutlined
                    className="text-red-500 cursor-pointer"
                    onClick={() => deleteDoc(item)}
                  />
                )}
              </List.Item>
            )}
          />
        </div>

        {/* Add Custom Document */}
        <div className="flex gap-2">
          <Input
            placeholder="Add custom document"
            value={customDocInput}
            onChange={(e) => setCustomDocInput(e.target.value)}
            onPressEnter={addCustomDoc}
          />
          <Button type="primary" icon={<PlusOutlined />} onClick={addCustomDoc}>
            Add
          </Button>
        </div>
      </Modal>
    );
  };

  // ===============================
  // UI RETURN
  // ===============================
  return (
    <section className="bg-[#F4F7FC] px-6 py-6 rounded-xl shadow-sm animate-fadeIn">
      {/* CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
        {cards.map((card) => (
          <div
            key={card.title}
            className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-gray-700 font-semibold">{card.title}</p>
              {card.icon}
            </div>

            <p className="text-3xl font-bold text-gray-800">{card.value}</p>
          </div>
        ))}
      </div>

      {/* CREATE BUTTON */}
      <div className="mt-8">
        <button
          onClick={() => setShowModal(true)}
          className="px-5 py-2.5 rounded-lg text-white shadow-md font-medium flex items-center gap-2 transition"
          style={{ backgroundColor: NCBA_BLUE }}
        >
          <PlusCircle size={18} />
          Create New Document Checklist
        </button>
      </div>

      {/* Checklist List Page */}
      <div>
        <CheckListPage />
      </div>


      <DocumentChecklistModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSaveChecklist}
      />
    </section>
  );
};

export default Hero;
