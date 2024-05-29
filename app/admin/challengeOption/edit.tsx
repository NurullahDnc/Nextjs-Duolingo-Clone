import { Edit } from "lucide-react";
import { BooleanInput, Create, NumberField, NumberInput, ReferenceField, ReferenceInput, SelectInput, SimpleForm, TextInput, required } from "react-admin";

export const ChallengeOptionEdit = () => {
  return (
    <Edit>
   <SimpleForm>
        <TextInput source="text" validate={[required()]} label="text" />
        <BooleanInput source="correct" label="correct option" />
         
        <ReferenceInput source="challengeId" reference="challenge" />
        <TextInput source="imageSrc" validate={[required()]} label="image url"  />
        <TextInput source="audioSrc" validate={[required()]} label="audio url"  />


      </SimpleForm>
    </Edit>
  );
};
