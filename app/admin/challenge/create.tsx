import { Create, NumberField, NumberInput, ReferenceField, ReferenceInput, SelectInput, SimpleForm, TextInput, required } from "react-admin";

export const ChallengeCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="question" validate={[required()]} label="question" />
        <SelectInput source="type" validate={[required()]}   choices={[
            {
              id: "SELECT",
              name: "SELECT"
            },
            {
              id: "ASSIST",
              name: "ASSIST"
            }
          ]} />
        <ReferenceInput source="lessonId" reference="lesson" />
        <NumberInput source="order" validate={[required()]} label="order"  />

      </SimpleForm>
    </Create>
  );
};
