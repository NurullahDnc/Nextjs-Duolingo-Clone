"use client";
import { Admin, Resource } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";
import { CourseList } from "./course/list";
import { CourseCreate } from "./course/create";
import { CourseEdit } from "./course/edit";
import { UnitList } from "./units/list";
import { UnitCreate } from "./units/create";
import { UnitEdit } from "./units/edit";
import { LessonList } from "./lesson/list";
import { LessonCreate } from "./lesson/create";
import { LessonEdit } from "./lesson/edit";
import { ChallengeList } from "./challenge/list";
import { ChallengeCreate } from "./challenge/create";
import { ChallengeEdit } from "./challenge/edit";
import { ChallengeOptionCreate } from "./challengeOption/create";
import { ChallengeOptionEdit } from "./challengeOption/edit";
import { ChallengeOptionList } from "./challengeOption/list";

const dataProvider = simpleRestProvider("/api");


const App = () => {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource
        name="course"
        list={CourseList}
        create={CourseCreate}
        edit={CourseEdit}
        recordRepresentation="title"
      />

      <Resource
        name="units"
        list={UnitList}
        create={UnitCreate}
        edit={UnitEdit}
        recordRepresentation="title"
      />

      <Resource
        name="lesson"
        list={LessonList}
        create={LessonCreate}
        edit={LessonEdit}
        recordRepresentation="title"
      />

      <Resource
        name="challenges"
        list={ChallengeList}
        create={ChallengeCreate}
        edit={ChallengeEdit}
        recordRepresentation="question"
      />

      
<Resource
        name="challengeOptions"
        list={ChallengeOptionList}
        create={ChallengeOptionCreate}
        edit={ChallengeOptionEdit}
        recordRepresentation="question"
      />

    </Admin>
  );
};

export default App;
