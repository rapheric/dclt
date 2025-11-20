// import React, { useState } from "react";
// import { Drawer, Input, Table, Button, Space, Tag, message } from "antd";
// import { PlusOutlined } from "@ant-design/icons";
// import { useCreateChecklistMutation } from "../../../api/checklistApi";

// const { Search } = Input;

// const customers = [
//   { id: 1, name: "John Mwangi", loanType: "Equity Release Loan", rmName: "Alice Wanjiku", rmEmail: "alice@ncba.com" },
//   { id: 2, name: "Grace Achieng", loanType: "Shamba Loan", rmName: "David Otieno", rmEmail: "david@ncba.com" },
// ];

// const loanDocs = {
//   "Equity Release Loan": [
//     { name: "Facility Letter", category: "Contract", status: "Pending" },
//     { name: "Borrower ID", category: "KYC", status: "Pending" },
//   ]
// };

// const ChecklistDrawerCO = () => {
//   const [open, setOpen] = useState(false);
//   const [selectedCustomer, setSelectedCustomer] = useState(null);
//   const [docs, setDocs] = useState([]);

//   const [createChecklist, { isLoading }] = useCreateChecklistMutation();

//   const searchCustomer = (value) => {
//     const c = customers.find((x) =>
//       x.name.toLowerCase().includes(value.toLowerCase())
//     );
//     setSelectedCustomer(c);
//     setDocs(c ? loanDocs[c.loanType] : []);
//   };

//   const submit = async () => {
//     if (!selectedCustomer) return message.error("Search a customer first");

//     const payload = {
//       ...selectedCustomer,
//       documents: docs,
//       status: "Sent to RM",
//     };

//     await createChecklist(payload);
//     message.success("Checklist sent to RM!");

//     setOpen(false);
//   };

//   return (
//     <>
//       <Button type="primary" onClick={() => setOpen(true)}>
//         Create Checklist
//       </Button>

//       <Drawer open={open} onClose={() => setOpen(false)} width={650} title="Create Checklist">
//         <Search placeholder="Search customer" onSearch={searchCustomer} />

//         {selectedCustomer && (
//           <>
//             <p><b>Customer:</b> {selectedCustomer.name}</p>
//             <p><b>Loan Type:</b> {selectedCustomer.loanType}</p>
//             <p><b>RM:</b> {selectedCustomer.rmName}</p>

//             <Table
//               dataSource={docs.map((d, i) => ({ ...d, key: i }))}
//               pagination={false}
//               columns={[
//                 { title: "Document", dataIndex: "name" },
//                 { title: "Category", dataIndex: "category" },
//                 { title: "Status", render: () => <Tag color="orange">Pending</Tag> },
//               ]}
//             />

//             <Button
//               type="primary"
//               block
//               onClick={submit}
//               loading={isLoading}
//               style={{ marginTop: 20 }}
//             >
//               Send to RM
//             </Button>
//           </>
//         )}
//       </Drawer>
//     </>
//   );
// };

// export default ChecklistDrawerCO;
import React, { useState } from "react";
import { Card, Form, Select, Input, Button } from "antd";
import { RM_LIST } from "../../../data/loanDocsConfig";
import { LOAN_DOCS_CONFIG } from "../../../data/loanDocsConfig";
import { useCreateChecklistMutation } from "../../../api/checklistApi";

const ChecklistDrawerCO = () => {
  const [form] = Form.useForm();
  const [loanType, setLoanType] = useState("");
  const [selectedRM, setSelectedRM] = useState(null);
  const [createChecklist] = useCreateChecklistMutation();

  const onFinish = async (values) => {
    await createChecklist({
      customerName: values.customerName,
      loanType: values.loanType,
      rmId: selectedRM.id,
      rmName: selectedRM.name,
      rmEmail: selectedRM.email,
    });

    form.resetFields();
    setLoanType("");
    setSelectedRM(null);
  };

  return (
    <Card title="Create Checklist" className="shadow p-4">
      <Form layout="vertical" form={form} onFinish={onFinish}>
        
        {/* Search Customer */}
        <Form.Item label="Customer Name" name="customerName" rules={[{ required: true }]}>
          <Input placeholder="Search customer..." />
        </Form.Item>

        {/* Loan Type */}
        <Form.Item label="Loan Type" name="loanType" rules={[{ required: true }]}>
          <Select
            placeholder="Select loan type"
            onChange={(val) => setLoanType(val)}
            options={Object.keys(LOAN_DOCS_CONFIG).map((k) => ({
              label: k,
              value: k,
            }))}
          />
        </Form.Item>

        {/* RM Selection */}
        <Form.Item label="Assign RM" name="rmId" rules={[{ required: true }]}>
          <Select
            placeholder="Select RM"
            onChange={(rmId) => {
              const rm = RM_LIST.find((r) => r.id === rmId);
              setSelectedRM(rm);
            }}
            options={RM_LIST.map((rm) => ({
              label: rm.name,
              value: rm.id,
            }))}
          />
        </Form.Item>

        {/* Auto-Populated Document Preview */}
        {loanType && (
          <Card className="mt-3" size="small" title="Auto-Populated Documents">
            {Object.entries(LOAN_DOCS_CONFIG[loanType]).map(([category, docs]) => (
              <div key={category} style={{ marginBottom: 10 }}>
                <strong>{category.toUpperCase()}</strong>
                <ul style={{ marginLeft: 20 }}>
                  {docs.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </div>
            ))}
          </Card>
        )}

        <Button type="primary" htmlType="submit" className="mt-3" block>
          Create Checklist
        </Button>
      </Form>
    </Card>
  );
};

export default ChecklistDrawerCO;
