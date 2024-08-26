import React, { useEffect, useState } from "react";
import { Edit, MoreHorizontalIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const RegisteredCompanies = ({ filter }) => {
  useGetAllCompanies();
  const { companies } = useSelector((store) => store.company);
  const [filteredCompanies, setFilteredCompanies] = useState(companies);

  useEffect(() => {
    const filtered = companies.filter((company) =>
      company.name.toLowerCase().includes(filter)
    );
    setFilteredCompanies(filtered);
  }, [filter]);

  return (
    <div className="mt-3 border rounded-lg pb-3">
      <Table className="text-md">
        <TableCaption>A list of your registered companies.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Registered on</TableHead>
            <TableHead>Website</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCompanies.map((company, index) => {
            return (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  <Avatar className="object-contain rounded-lg p-1">
                    <AvatarImage src={company.logo} />
                    <AvatarFallback>Logo</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell>{company.name}</TableCell>
                <TableCell>{company.createdAt.split("T")[0]}</TableCell>
                <TableCell>
                  {company.website ? (
                    <a
                      href={`https://${company.website}`}
                      target="_blank"
                      className=" text-blue-400 hover:underline"
                    >
                      Link
                    </a>
                  ) : (
                    "NA"
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontalIcon />
                    </PopoverTrigger>
                    <PopoverContent className="mx-2 w-fit">
                      <Link
                        to={`/admin/companies/edit/${company._id}`}
                        className="flex gap-[5px] items-center cursor-pointer hover:underline hover:text-blue-400"
                      >
                        <Edit className="w-[18px]" />
                        <div>Edit</div>
                      </Link>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default RegisteredCompanies;
