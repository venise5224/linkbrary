import { LinkData } from "@/types/linkTypes";
import LinkCard from "../LinkCard";

interface LinkListProps {
  links: LinkData[];
}

const LinkList = ({ links }: LinkListProps) => {
  return links.map((link) => <LinkCard key={link.id} info={link} />);
};

export default LinkList;
