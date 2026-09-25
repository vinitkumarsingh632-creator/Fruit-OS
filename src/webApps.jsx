import { useEffect, useState } from 'react'
import notesIcon from './assets/Notes.png'
import './webApp.css'
import Calculator from './Calculator'

export default function WebApps() {
    const [notes, setNotes] = useState(() => {
        const savedNotes = sessionStorage.getItem('notes')
        return savedNotes ? JSON.parse(savedNotes) : []
    })

    const [calculatorOpen, setCalculatorOpen] = useState(false)

    const [calculatorPosition, setCalculatorPosition] = useState({
        x: 500,
        y: 150
    })

    const [dragging, setDragging] = useState(null)

    useEffect(() => {
        sessionStorage.setItem('notes', JSON.stringify(notes))
    }, [notes])

    useEffect(() => {
        const handleMove = (e) => {
            if (!dragging) return

            if (dragging.type === 'note') {
                setNotes(prev =>
                    prev.map(note =>
                        note.id === dragging.id
                            ? {
                                ...note,
                                x: e.clientX - dragging.offsetX,
                                y: e.clientY - dragging.offsetY
                            }
                            : note
                    )
                )
            }

            if (dragging.type === 'calculator') {
                setCalculatorPosition({
                    x: e.clientX - dragging.offsetX,
                    y: e.clientY - dragging.offsetY
                })
            }
        }

        const handleUp = () => {
            setDragging(null)
        }

        window.addEventListener('pointermove', handleMove)
        window.addEventListener('pointerup', handleUp)

        return () => {
            window.removeEventListener('pointermove', handleMove)
            window.removeEventListener('pointerup', handleUp)
        }
    }, [dragging])

    function addNote() {
        const newNote = {
            id: Date.now(),
            title: 'New Note',
            content: '',
            x: 150 + notes.length * 30,
            y: 100 + notes.length * 30,
            width: 500,
            height: 400
        }

        setNotes(prev => [...prev, newNote])
    }

    function deleteNote(id) {
        setNotes(prev => prev.filter(note => note.id !== id))
    }

    function changeTitle(id, value) {
        setNotes(prev =>
            prev.map(note =>
                note.id === id
                    ? { ...note, title: value }
                    : note
            )
        )
    }

    function changeContent(id, value) {
        setNotes(prev =>
            prev.map(note =>
                note.id === id
                    ? { ...note, content: value }
                    : note
            )
        )
    }

    function startNoteDrag(e, note) {
        if (
            e.target.tagName === 'INPUT' ||
            e.target.tagName === 'BUTTON'
        ) {
            return
        }

        const rect = e.currentTarget.parentElement.getBoundingClientRect()

        setDragging({
            type: 'note',
            id: note.id,
            offsetX: e.clientX - rect.left,
            offsetY: e.clientY - rect.top
        })
    }

    function startCalculatorDrag(e) {
        if (e.target.tagName === 'BUTTON') {
            return
        }

        const rect = e.currentTarget.parentElement.getBoundingClientRect()

        setDragging({
            type: 'calculator',
            offsetX: e.clientX - rect.left,
            offsetY: e.clientY - rect.top
        })
    }

    return (
        <>
            <div className="appsContainer">
                <div
                    className="appIcon"
                    onClick={addNote}
                >
                    <img
                        src={notesIcon}
                        alt="Notes"
                    />
                    <p>Notes</p>
                </div>

                <div
                    className="appIcon"
                    onClick={() => setCalculatorOpen(true)}
                >
                    <div className="calculatorIcon">
                        🧮
                    </div>
                    <p>Calculator</p>
                </div>
            </div>

            {notes.map(note => (
                <div
                    key={note.id}
                    className="noteWindow"
                    style={{
                        left: note.x,
                        top: note.y,
                        width: note.width,
                        height: note.height
                    }}
                >
                    <div
                        className="noteHeader"
                        onPointerDown={e => startNoteDrag(e, note)}
                    >
                        <input
                            className="noteTitle"
                            value={note.title}
                            onChange={e =>
                                changeTitle(note.id, e.target.value)
                            }
                        />

                        <button
                            className="closeButton"
                            onClick={() => deleteNote(note.id)}
                        >
                            ×
                        </button>
                    </div>

                    <textarea
                        className="noteContent"
                        value={note.content}
                        onChange={e =>
                            changeContent(note.id, e.target.value)
                        }
                        placeholder="Start writing..."
                    />
                </div>
            ))}

            {calculatorOpen && (
                <div
                    className="calculatorWindow"
                    style={{
                        left: calculatorPosition.x,
                        top: calculatorPosition.y
                    }}
                >
                    <div
                        className="calculatorHeader"
                        onPointerDown={startCalculatorDrag}
                    >
                        <span>Calculator</span>

                        <button
                            className="calculatorClose"
                            onClick={() => setCalculatorOpen(false)}
                        >
                            ×
                        </button>
                    </div>

                    <Calculator />
                </div>
            )}
        </>
    )
}