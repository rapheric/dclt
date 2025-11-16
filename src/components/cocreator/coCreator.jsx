import React, { useState } from "react";
import {
    FileText,
    Clock,
    AlertTriangle,
    CheckCircle,
    PlusCircle,
    XCircle,
    Check,
} from "lucide-react";
import Navbarco from "./navbarco";

const Cocreator = () => {
    const [activeTab, setActiveTab] = useState("active");
    // const [showModal, setShowModal] = useState(false);

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

    const deferrals = [
        {
            id: 1,
            title: "Audited Financial Statements 2023",
            client: "ABC Corporation",
            rm: "Sarah Johnson",
            requestedDate: "2024-11-08",
            reason:
                "Auditor is currently finalizing the report. Expected completion date is November 25, 2024. Will submit immediately upon receipt.",
        },
        {
            id: 2,
            title: "Board Resolution",
            client: "Tech Solutions Ltd",
            rm: "Michael Chen",
            requestedDate: "2024-11-10",
            reason:
                "Board meeting scheduled for November 20, 2024. Resolution will be prepared and submitted within 2 business days after the meeting.",
        },
    ];

    return (
        <>
        <Navbarco/>
        <section className="bg-[#F4F7FC] px-6 py-6 rounded-xl shadow-sm">
            

            {/* SUMMARY CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                {cards.map((card) => (
                    <div
                        key={card.title}
                        className="bg-white border rounded-xl shadow-sm p-6 hover:shadow-lg transition-all"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <p className="text-gray-700 font-semibold">{card.title}</p>
                            {card.icon}
                        </div>
                        <p className="text-3xl font-bold text-gray-800">{card.value}</p>
                    </div>
                ))}
            </div>

            {/* CREATE NEW CHECKLIST BUTTON */}
            <div className="mt-6">
                <button
                    // onClick={() => setShowModal(true)}
                    className="px-5 py-2.5 rounded-lg text-white shadow-md font-medium flex items-center gap-2 transition"
                    style={{ backgroundColor: NCBA_BLUE }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#2A1F63")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = NCBA_BLUE)}
                >
                    <PlusCircle size={18} />
                    Create New Document Checklist
                </button>
            </div>

            {/* TABS */}
            <div className="flex items-center space-x-8 text-sm font-medium mt-6">
                {["active", "deferrals", "completed"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-2 capitalize transition ${activeTab === tab
                                ? "border-b-2"
                                : "text-gray-600 hover:text-[#3A2A82]"
                            }`}
                        style={
                            activeTab === tab
                                ? { color: NCBA_BLUE, borderColor: NCBA_BLUE }
                                : {}
                        }
                    >
                        {tab === "deferrals" ? (
                            <span className="relative">
                                Deferrals
                                <span className="absolute -top-2 -right-3 bg-orange-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                                    2
                                </span>
                            </span>
                        ) : (
                            tab
                        )}
                    </button>
                ))}
            </div>

            {/* TAB CONTENT */}
            <div className="mt-6">

                {/* ACTIVE TAB */}
                {activeTab === "active" && (
                    <p className="text-gray-600">List of active checklists goes here...</p>
                )}

                {/* COMPLETED TAB */}
                {activeTab === "completed" && (
                    <div className="mt-4">

                        <div className="bg-[#F2FCF6] border border-green-300 rounded-xl p-6 shadow-sm relative">

                            <h3 className="text-xl font-semibold text-gray-800">XYZ Enterprises</h3>
                            <p className="text-gray-600 text-sm mt-1">Completed on 2024-11-05</p>

                            <span className="absolute top-6 right-6 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                                <CheckCircle size={16} className="text-white" />
                                Completed
                            </span>

                            <div className="mt-6 flex items-center gap-3 text-green-700 font-medium text-lg">
                                <CheckCircle size={22} className="text-green-600" />
                                All 6 documents approved
                            </div>
                        </div>

                    </div>
                )}

                {/* DEFERRALS TAB — UPDATED TO MATCH YOUR SCREENSHOT */}
                {activeTab === "deferrals" && (
                    <div className="space-y-6 mt-4">

                        {deferrals.map((item) => (
                            <div
                                key={item.id}
                                className="bg-[#FFFCF5] border border-yellow-300 rounded-xl p-6 shadow-sm"
                            >
                                {/* Header */}
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                                        <p className="text-gray-700 mt-1">
                                            Client: {item.client} • RM: {item.rm}
                                        </p>
                                    </div>

                                    <span className="flex items-center gap-1 bg-yellow-100 text-yellow-700 border border-yellow-300 px-3 py-1 rounded-full text-xs font-medium">
                                        <Clock size={14} className="text-yellow-600" />
                                        Pending Review
                                    </span>
                                </div>

                                {/* Requested Date */}
                                <p className="text-gray-700 font-medium mt-4">
                                    Requested on: {item.requestedDate}
                                </p>

                                {/* Reason Box */}
                                <div className="mt-4 bg-white border border-yellow-300 rounded-lg p-4 text-gray-800 leading-relaxed">
                                    {item.reason}
                                </div>

                                {/* Buttons */}
                                <div className="flex items-center gap-4 mt-6">

                                    <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg font-medium shadow">
                                        <Check size={18} />
                                        Approve Deferral
                                    </button>

                                    <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg font-medium shadow">
                                        <XCircle size={18} />
                                        Reject Deferral
                                    </button>

                                </div>
                            </div>
                        ))}

                    </div>
                )}

            </div>

        </section>
        </>
    );
};

export default Cocreator;

