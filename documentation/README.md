# Project Documentation

This folder contains complete technical documentation for the **All In One Dictionary** project.

## Contents
1. [Use Case Diagram](./1.Use_Case_Diagram.md)
2. [Use Case Descriptions](./2.Use_Case_Descriptions.md)
3. [Activity Diagrams](./3.Activity_Diagrams.md)
4. [Entity Relationship Diagram](./4.Entity_Relationship_Diagram.md)
5. [Sequence Diagrams](./5.Sequence_Diagrams.md)
6. [Class Diagram](./6.Class_Diagram.md)
7. [Database Design](./7.Database_Design.md)
8. [System Architecture](./8.System_Architecture.md)
9. [Setup and Run Guide](./9.Setup_and_Run.md)
10. [Feature Documentation](./10.Feature_Documentation.md)
11. [SRS Report](./11.SRS_Report.md)
12. [Project Report](./12.Project_Report.md)
13. [University Justification Form](./13.University_Justification_Form.md)
14. [Master Project References](./14.References.md)

## Project Summary
- **Type:** Frontend-only offline dictionary and translator
- **Stack:** React 19 + TypeScript + Vite + Tailwind CSS
- **Key Modules:** `src/App.tsx`, `src/utils/engine.ts`, `src/data/dictionary.ts`
- **Persistence:** Browser Local Storage (`dictionary_favorites`, `dictionary_history`)
- **External Browser APIs:** Speech Recognition + Speech Synthesis

## Scope Note
The ERD and SQL database design are **target backend designs** for future scaling. The current implementation is local, in-memory + browser storage.
