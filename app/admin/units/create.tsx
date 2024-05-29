import { Create, NumberField, NumberInput, ReferenceField, ReferenceInput, SimpleForm, TextInput, required } from "react-admin";

export const UnitCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="title" validate={[required()]} label="title" />
        <TextInput source="description" validate={[required()]} label="description" />
        <ReferenceInput source="courseId" reference="course" />
        <NumberInput source="order" validate={[required()]} label="order"  />

      </SimpleForm>
    </Create>
  );
};
