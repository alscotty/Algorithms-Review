import React, { useState } from 'react'
import './App.css'
import { submit } from './api/index.ts'

/* If using TypeScript, remove the comment block

type Values = Record<string, unknown>

type Field = {
  type: 'string' | 'boolean' | 'number';
  label: string;
  placeholder?: string;
  hidden?: (values: Values) => boolean;
}

type Form = {
  [fieldId: string]: Field
}
*/

// If using TypeScript this can be `const form: Form = {`
/** 
const form = {
  firstName: { type: 'string', label: 'First name' },
  lastName: { type: 'string', label: 'Last name' },
  email: { type: 'string', label: 'Email', placeholder: "example@gmail.com" },
  age: { type: 'number', label: 'Age' },
  agree: { type: 'boolean', label: 'Agree to terms of service' },
}
**/

const form = {
  email: { type: 'string', label: 'Email' },
  unsubscribe: { type: 'boolean', label: 'Unsubscribe from marketing emails' },
  reason: { type: 'string', label: 'Please tell us why!', hidden: ({ unsubscribe }) => !unsubscribe },
}

/*
First name         [             ]
Last name          [             ]
Email              [             ]
Age                [             ]
Agree to terms                 [ ]
*/

const App = () => {
  let stateDefault = {};
  let keyNames = Object.keys(form);
  for (let keyName of keyNames) {
    if (form[keyName].type == 'boolean') {
      stateDefault[keyName] = true
    } else {
      stateDefault[keyName] = ''
    }
  }
  const [formData, setFormData] = useState(stateDefault);
  const [formSuccess, setFormSuccess] = useState('')

  const handleFormUpdate = (e) => {
    const { name, value, checked } = e.target;

    setFormData({
      ...formData,
      [name]: checked
    })
  }

  const handleFormSubmit = async(e) => {
    e.preventDefault();
    try {
      await submit(true);
      setFormSuccess(true)
    } catch(e) {
      setFormSuccess(false)
    }
    console.log({formSuccess})
  }

  return (
    <form onSubmit={(e) => handleFormSubmit(e)}>
      Enter data
      <br />
      {Object.keys(form).map(formKey => {
        let formDataInfo = form[formKey];
        const { type, label, placeholder, hidden } = formDataInfo

        let mappedType = type;
        if (type === 'string') mappedType = 'text'
        if (type === 'boolean') mappedType = 'checkbox'


        return (
          <div
            hidden={hidden ? hidden(formData) : false}
          >
            <span className='form-element' key={label}> {label}
              <input
                type={mappedType}
                placeholder={placeholder}
                label={label}
                name={formKey}
                checked={mappedType == 'boolean' ? formData[label] : null}
                onChange={(e) => handleFormUpdate(e)} value={formData[label]}></input>
            </span>
            <br />
          </div>
        )
      })}
      <button type='submit'>
        Submit
      </button>
      {formSuccess === '' ? '':`Form Submitted? ${formSuccess}`}
    </form>
  )
}

export default App
