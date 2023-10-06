// PatchView.js
import React, { useState } from 'react'
import { useParams, useHistory, Link } from 'react-router-dom'
import { saveToLocalStorage } from './utility'

const PatchView = () => {
  const { farmId, patchId } = useParams()
  const history = useHistory()

  // Retrieve farm data from local storage or any other source
  const farmData = JSON.parse(localStorage.getItem('farmData'))
  const selectedFarm = farmData[farmId]
  const selectedPatch = selectedFarm?.patches[patchId]
  const [fakeCount, setFakeCount] = useState(0)

  const handleSave = (e) => {
    e.preventDefault()
    saveToLocalStorage('farmData', farmData)
    history.push(`/view-farm/${farmId}`)
  }

  const addRow = (e) => {
    selectedPatch.rows.push({ number: '', vineCount: '' })
    setFakeCount(fakeCount + 1)
    saveToLocalStorage('farmData', farmData)
  }

  if (!selectedPatch) {
    return <div>Invalid Patch ID</div>
  }

  return (
    <div>
      <h2>Farm Name: {selectedFarm.name} </h2>
      <h3>Patch Name: {selectedPatch.name}</h3>

      <table>
        <thead>
          <tr>
            <th>Row</th>
            <th>Vines</th>
            <th>Puller</th>
            <th>Roller</th>
          </tr>
        </thead>
        <tbody>
          {selectedPatch.rows.map((row, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  defaultValue={row.number}
                  onChange={(e) => {
                    row.number = e.target.value
                  }}
                />
              </td>
              <td>
                <input
                  type="text"
                  defaultValue={row.vineCount}
                  onChange={(e) => {
                    row.vineCount = e.target.value
                  }}
                />
              </td>
              <td>
                <input
                  type="text"
                  defaultValue={row.puller}
                  onChange={(e) => {
                    row.puller = e.target.value
                  }}
                />
              </td>
              <td>
                <input
                  type="text"
                  defaultValue={row.roller}
                  onChange={(e) => {
                    row.roller = e.target.value
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        <button type="button" onClick={addRow}>
          Add row
        </button>
      </p>
      <p>
        <button type="button" onClick={handleSave}>
          Submit
        </button>
      </p>

      <p>
        <Link to={`/view-farm/${farmId}`}>Back</Link>
      </p>
    </div>
  )
}

export default PatchView
