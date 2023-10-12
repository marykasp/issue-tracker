import dynamic from "next/dynamic";
import IssueFormSkeleton from "./loading";

// lazy loading - allow for dynamic loading of IssueForm
const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

const NewIssuePage = () => {
  return <IssueForm />;
};

export default NewIssuePage;
