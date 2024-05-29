import { Create, Datagrid, Edit, List, SimpleForm, TextField, TextInput, required } from "react-admin";

export const CourseEdit = () => {
  return (
    <Edit>
      <SimpleForm>
      <TextInput source="id" validate={[required()]} label="id" />
        <TextInput source="title" validate={[required()]} label="title" />
        <TextInput source="imageSrc" validate={[required()]} label="image" />

      </SimpleForm>
    </Edit>
  );
};
