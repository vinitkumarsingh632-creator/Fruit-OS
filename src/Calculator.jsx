import { useState } from 'react'
import './Calculator.css'

export default function Calculator() {
    const [display, setDisplay] = useState('0')
    const [firstValue, setFirstValue] = useState(null)
    const [operator, setOperator] = useState(null)
    const [waiting, setWaiting] = useState(false)

    function inputNumber(number) {
        if (waiting) {
            setDisplay(number)
            setWaiting(false)
            return
        }

        setDisplay(prev =>
            prev === '0' ? number : prev + number
        )
    }

    function inputDecimal() {
        if (waiting) {
            setDisplay('0.')
            setWaiting(false)
            return
        }

        if (!display.includes('.')) {
            setDisplay(prev => prev + '.')
        }
    }

    function calculate(a, b, op) {
        if (op === '+') return a + b
        if (op === '-') return a - b
        if (op === '×') return a * b
        if (op === '÷') return b === 0 ? 0 : a / b
        return b
    }

    function chooseOperator(op) {
        const value = Number(display)

        if (firstValue !== null && operator && !waiting) {
            const result = calculate(firstValue, value, operator)
            setDisplay(String(result))
            setFirstValue(result)
        } else {
            setFirstValue(value)
        }

        setOperator(op)
        setWaiting(true)
    }

    function equals() {
        if (firstValue === null || operator === null) return

        const result = calculate(
            firstValue,
            Number(display),
            operator
        )

        setDisplay(String(result))
        setFirstValue(null)
        setOperator(null)
        setWaiting(true)
    }

    function clear() {
        setDisplay('0')
        setFirstValue(null)
        setOperator(null)
        setWaiting(false)
    }

    function toggleSign() {
        setDisplay(prev =>
            prev === '0'
                ? '0'
                : String(Number(prev) * -1)
        )
    }

    function percentage() {
        setDisplay(String(Number(display) / 100))
    }

    return (
        <div className="calculator">
            <div className="calculatorDisplay">
                {display}
            </div>

            <div className="calculatorButtons">
                <button onClick={clear}>AC</button>
                <button onClick={toggleSign}>±</button>
                <button onClick={percentage}>%</button>
                <button onClick={() => chooseOperator('÷')}>÷</button>

                <button onClick={() => inputNumber('7')}>7</button>
                <button onClick={() => inputNumber('8')}>8</button>
                <button onClick={() => inputNumber('9')}>9</button>
                <button onClick={() => chooseOperator('×')}>×</button>

                <button onClick={() => inputNumber('4')}>4</button>
                <button onClick={() => inputNumber('5')}>5</button>
                <button onClick={() => inputNumber('6')}>6</button>
                <button onClick={() => chooseOperator('-')}>−</button>

                <button onClick={() => inputNumber('1')}>1</button>
                <button onClick={() => inputNumber('2')}>2</button>
                <button onClick={() => inputNumber('3')}>3</button>
                <button onClick={() => chooseOperator('+')}>+</button>

                <button
                    className="zero"
                    onClick={() => inputNumber('0')}
                >
                    0
                </button>

                <button onClick={inputDecimal}>.</button>
                <button onClick={equals}>=</button>
            </div>
        </div>
    )
}