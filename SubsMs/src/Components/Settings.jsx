import React, { useState } from "react";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { saveAs } from "file-saver";

const sampleData = [
  {
    surname: "Dela Cruz",
    firstname: "Juan",
    middlename: "Santos",
    dateofbirth: "1990-01-01",
    placeofbirth: "Laguna",
    mothermaidenname: "Maria Lopez",
    gender: "Male",
    civilstatus: "Single",
    citizenship: "Filipino",
    occupation: "Engineer",
    billingadd: "123 Main St",
    mobilenumber: "09171234567",
    address: "Santa Cruz, Laguna",
    employername: "ABC Corp",
    employeraddress: "Makati City",
    officenumber: "555-1234",
  },
];

const Settings = () => {
  const [selected, setSelected] = useState(null);

  const handlePrint = async () => {
    if (!selected) return alert("Please select a row first");

    // ✅ Load fixed template from public folder
    const response = await fetch("/ApplicationTemplateFixed.docx");
    const content = await response.arrayBuffer();

    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
      delimiters: { start: "[[", end: "]]" }, // use safe delimiters
    });

    doc.render(selected); // fills placeholders [[surname]], etc.

    const out = doc.getZip().generate({
      type: "blob",
      mimeType:
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });

    saveAs(out, `${selected.surname}_Application.docx`);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">Application Table</h1>
      <table className="border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2">Surname</th>
            <th className="border px-2">Firstname</th>
            <th className="border px-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {sampleData.map((row, idx) => (
            <tr key={idx}>
              <td className="border px-2">{row.surname}</td>
              <td className="border px-2">{row.firstname}</td>
              <td className="border px-2">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                  onClick={() => setSelected(row)}
                >
                  Select
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selected && (
        <div className="mt-4">
          <p>
            Selected: {selected.firstname} {selected.surname}
          </p>
          <button
            onClick={handlePrint}
                      className="bg-green-600 text-white px-3 py-2 rounded"
          >
            Print Application
          </button>
        </div>
      )}
    </div>
  );
};

export default Settings;
