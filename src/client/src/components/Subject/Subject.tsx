import React, { FunctionComponent, useState, useEffect } from 'react';
import cuid from 'cuid';
import { create } from '../../utils/http';

export const SubjectContext = React.createContext('');

interface ISubjectProps {
  children: any;
}

const Subject: FunctionComponent<ISubjectProps> = ({ children }) => {
  const [subjectId, setSubjectId] = useState('');

  useEffect(() => {
    const id = window.localStorage && window.localStorage.getItem('subjectId');

    if (id) {
      console.log("SETTING SUBJECT ID:", id)
      setSubjectId(id);
    } else {
      const newId = cuid();
      window.localStorage && window.localStorage.setItem('subjectId', newId);
      console.log("SETTING NEW SUBJECT ID:", newId)
      setSubjectId(newId);
      console.log("CREATING NEW SUBJECT:", newId)
      create('subject', { subjectId: newId });
    }
  }, []);

  return (
    <SubjectContext.Provider value={subjectId}>
      {children}
    </SubjectContext.Provider>
  );
};

export default Subject;
