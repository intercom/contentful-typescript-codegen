import { ContentType } from "contentful";
interface Options {
    namespace?: string;
}
export default function renderFieldsOnly(contentTypes: ContentType[], { namespace }?: Options): Promise<string>;
export {};
