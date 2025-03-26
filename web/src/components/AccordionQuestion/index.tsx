import { useState } from 'react';

import { 
    Accordion,
    AccordionHeader,
    AccordionContent
 } from './style';

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
            <AccordionHeader onClick={toggleAccordion}>
                <h3>{title}</h3>
                <span className={`arrow ${isOpen ? 'open' : ''}`}>▼</span>
            </AccordionHeader>
            {isOpen && (
                <AccordionContent>
                    <p>{content}</p>
                </AccordionContent>
            )}
        </Accordion>
    );
}