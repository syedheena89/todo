import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Formik, Form, Field } from "formik";

import * as Yup from "yup";

const createTaskSchema = Yup.object().shape({
  title: Yup.string("Invalid taskname")
    .min(3, "Task cannot be less than 3 characters")
    .max(30, "Task is too long !"),

  description: Yup.string("Invalid description")
    .min(3, "Description cannot be less than 3 characters")
    .max(100, "Description is too long !")
    .required("Required"),
  deadline: Yup.string("Invalid date").required("Required"),
  priority: Yup.string("Invalid input").required("Required"),
  tags: Yup.string("Invalid tag").required("Required"),
});

const ItemForm = ({
  toDo,
  setToDo,
  title,
  setTitle,
  taskType,
  modal,
  setModal,
  addTask,
  updateTask,
  updateData,
  setUpdateData,
  id,
}) => {
  const [initialValues, setInitialValues] = useState({
    title: "",
    description: "",
    deadline: "",
    id: uuidv4(),
    priority: false,
    tags: "",
    image: "",
  });

  const handleSave = async (values) => {
    setInitialValues(values);
    values.title = title;
    if (taskType === "create") {
      setToDo([...toDo, values]);
      setTitle("");
      setModal(false);
    } else if (taskType === "update") {
      values.title = title;
      updateTask(values, id);
      setModal(false);
    }
  };

  return (
    <Formik
      validationSchema={createTaskSchema}
      initialValues={initialValues}
      onSubmit={handleSave}
    >
      {(props) => (
        <Form>
          <div>
            <div className={`modal ${modal ? "open" : ""}`} id="modal">
              <div className="modal-content">
                <div className="modal-header">
                  <button
                    onClick={() => {
                      setModal(false);
                    }}
                    title="Close Modal"
                    className="modal-close button"
                  >
                    X
                  </button>
                  {taskType === "create" ? (
                    <h3> CREATE TASK</h3>
                  ) : (
                    <h3> UPDATE TASK</h3>
                  )}
                  <div className="modal-area">
                    <div className="modal-body">
                      <div className="modal-form">
                        <div className="form-group">
                          <label htmlFor="task">Task</label>
                          <Field
                            name="title"
                            id="title"
                            type="text"
                            className="task-item-title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                          />
                          {props.errors.task && props.touched.task ? (
                            <div>{props.errors.task}</div>
                          ) : null}
                        </div>
                        <div>
                          <label htmlFor="deadline">Deadline</label>
                          <input
                            type="date"
                            id="deadline"
                            name="deadline"
                            className="task-item-deadline"
                            onChange={(date) =>
                              props.setFieldValue("deadline", date.target.value)
                            }
                          />
                        </div>
                        <div>
                          <label htmlFor="description">Description</label>
                          <Field
                            name="description"
                            type="textarea"
                            className="task-item-description"
                            id="description "
                          />
                          {props.errors.description &&
                          props.touched.description ? (
                            <div>{props.errors.description}</div>
                          ) : null}
                          <div className="modal-priority">
                            <label htmlFor="priority"> Priority</label>
                            <Field
                              type="checkbox"
                              id="priority"
                              name="priority"
                            />
                          </div>
                          {props.errors.priority && props.touched.priority ? (
                            <div>{props.errors.priority}</div>
                          ) : null}
                        </div>
                        <br></br>
                        <div>
                          <label htmlFor="tags">Tags</label>
                          <select
                            className="tag-item"
                            onChange={(tags) =>
                              props.setFieldValue("tags", tags.target.value)
                            }
                          >
                            <option>select</option>
                            <option>Work</option>
                            <option>Home</option>
                            <option>Tests</option>
                            <option>Lectures</option>
                          </select>

                          {props.errors.tags && props.touched.tags ? (
                            <div>{props.errors.tags}</div>
                          ) : null}
                        </div>

                        <div>
                          <label htmlFor="imageuploader">Image</label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(loadFile) =>
                              props.setFieldValue(
                                "image",
                                loadFile.target.value
                              )
                            }
                          />

                          {props.errors.image && props.touched.image ? (
                            <div>{props.errors.image}</div>
                          ) : null}
                        </div>

                        <button
                          className="form-btn"
                          id="create-btn"
                          type="submit"
                        >
                          Submit
                        </button>
                        <button
                          className="form-btn"
                          id="cancel-btn"
                          onClick={() => {
                            setModal(false);
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ItemForm;
