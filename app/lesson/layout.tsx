interface LessonLayoutProps {
  children: React.ReactNode;
}

const LessonLayout = ({ children }: LessonLayoutProps) => {
  return (
    <div>
      <div>{children}</div>
    </div>
  );
};

export default LessonLayout;
