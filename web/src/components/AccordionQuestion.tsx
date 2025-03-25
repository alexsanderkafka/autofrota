import { useState } from 'react';

import styled from "styled-components";

//talves precise alterar o width para %
const Accordion = styled.div`
    border: 1px solid #2563EB;
    border-radius: 10px;
    overflow: hidden;
    width: 1042px;
    margin-bottom: 20px;

    transition: 0.3s;

    .accordion-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 20px;
        background-color: white;
        cursor: pointer;
        color: #343A40;
    }

    .accordion-header h3 {
        margin: 0;
        font-size: 24px;
        color: #000;
        font-weight: 500;
    }

    .arrow {
        font-size: 12px;
        transition: transform 0.3s ease;
        color: #2563EB;
    }

    .arrow.open {
        transform: rotate(180deg);
    }

    .accordion-content {
        padding: 15px 20px;
        border-top: 3px solid #2563EB;
    }

    .accordion-content p {
        margin: 0;
        color: #343A40;
        line-height: 1.5;
    }
`

interface AccordionQuestionProps{
    title?: string,
    content?: string
}

export default function AccordionQuestion({title = "Title", content = "Question"}:  AccordionQuestionProps){
    const [isOpen, setIsOpen] = useState(false);
    
    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return(
        <Accordion>
            <div className="accordion-header" onClick={toggleAccordion}>
            <h3>{title}</h3>
        <span className={`arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </div>
            {isOpen && (
                <div className="accordion-content">
                <p>{content}</p>
                </div>
            )}
        </Accordion>
    );
}