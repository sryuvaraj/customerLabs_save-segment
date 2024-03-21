import axios from "axios";
import React, { useState } from "react";
import { FiChevronLeft } from "react-icons/fi";
import { FaReact } from 'react-icons/fa';


const NewSchema = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [segmentName, setSegmentName] = useState("");
  const [schemasList, setSchemasList] = useState([
    {
      label: "First Name",
      value: "first_name",
    },
    {
      label: "Last Name",
      value: "last_name",
    },
    {
      label: "Gender",
      value: "gender",
    },
    {
      label: "Age",
      value: "age",
    },
    {
      label: "Account Name",
      value: "account_name",
    },
    {
      label: "City",
      value: "city",
    },
    {
      label: "State",
      value: "state",
    },
  ]);
  const [currentSchemaList, setCurrentSchemaList] = useState([]);
  const [selectedSchema, setSelectedSchema] = useState("");

  const addNewSchema = () => {
    setCurrentSchemaList([...currentSchemaList, selectedSchema]);
  };

  const saveTheSegment = async () => {
    const data = {
      segment_name: segmentName,
      schema: currentSchemaList.map((schema) => ({
        [schema]: schemasList.find((item) => item.value === schema).label,
      })),
    };
    await axios.post("http://localhost:3001/segs",data)
    console.log(JSON.stringify(data, null, 2)); // Log the formatted data
    setShowPopup(false);
  };

  const saveSegment = () => {
    setShowPopup(true);
  };

  return (
    <>
      <div>
        <div>
          <div id="homeDiv">
            <div id="nav">
              <p id="viewAud"><span><FiChevronLeft size={25} className="pb-1 mx-2" /></span>View Audience</p>
            </div>
            <div>
              <button
                onClick={saveSegment}
                id="saveSegmentBtn"
                className="btn btn-light"
              >
                Save Segment
              </button>
            </div>
          </div>
          <div>
            {showPopup && (
              <div id="popupBackgound">
                <div id="popupDiv">
                  <div id="popupNav">
                    <p id="savingSegment"><span><FiChevronLeft size={25} className="pb-1 mx-2" /></span>Saving Segment</p>
                  </div>

                  <div id="popupContent" className="bg-white">
                    <p>Enter the Name of the Segment</p>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter the segment"
                      value={segmentName}
                      onChange={(e) => setSegmentName(e.target.value)}
                    />
                    <p className="my-3">
                      To save your segments, you need to add the schemas to
                      build the query
                    </p>
                    <ul id="traitsList" style={{display:"flex", justifyContent:"flex-end"}}>
                      <li className="px-4" id="userTrati">-User Traits</li>
                      <li id="groupTrait">-Group Traits</li>
                    </ul>

                    <div id="shemaList">
                      {currentSchemaList.length === 0 ? (
                        <p className="my-1">No Schemas to Display</p>
                      ) : (
                        currentSchemaList.map((schema, index) => (
                          <div
                            key={index}
                            className="my-2"
                            style={{ display: "flex" }}
                          >
                            <select
                              className="form-control custom-select"
                              onChange={(e) => {
                                const updatedSchemas = [...currentSchemaList];
                                updatedSchemas[index] = e.target.value;
                                setCurrentSchemaList(updatedSchemas);
                              }}
                              value={schema}
                            >
                              {schemasList.map((sche) => (
                                <option key={sche.value} value={sche.value}>
                                  {sche.label}
                                </option>
                              ))}
                            </select>
                            <button className="btn btn-light mx-1 px-3">-</button>
                          </div>
                        ))
                      )}
                    </div>
                    <select
                      className="form-control my-2 custom-select"
                      name="selectedSchema"
                      onChange={(e) => setSelectedSchema(e.target.value)}
                      value={selectedSchema}
                    >
                      <option value="">Select Schema</option>
                      {schemasList.map((schema) => (
                        <option key={schema.value} value={schema.value}>
                          {schema.label}
                        </option>
                      ))}
                    </select>
                    <button
                      id="addNewSchemaBtn"
                      className="text-success my-2"
                      onClick={addNewSchema}
                    >
                      +Add new schema
                    </button>
                  </div>

                  <div>
                    <button
                      onClick={saveTheSegment}
                      className="btn btn-success m-3"
                    >
                      Save the Segment
                    </button>
                    <button
                      onClick={() => setShowPopup(false)}
                      className="btn text-danger"
                      style={{ background: "white" }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NewSchema;
