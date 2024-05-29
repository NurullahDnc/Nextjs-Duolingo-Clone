import { BooleanInput, Create, NumberField, NumberInput, ReferenceField, ReferenceInput, SelectInput, SimpleForm, TextInput, required } from "react-admin";

export const ChallengeOptionCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="text" label="text" />
        <BooleanInput source="correct" label="correct option" />
         
        <ReferenceInput source="challengesId" reference="challenges" />
        <TextInput source="imageSrc" label="image url"  />
        <TextInput source="audioSrc" label="audio url"  />


      </SimpleForm>
    </Create>
  );
};
