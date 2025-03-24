import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "../ui/table";
import { Country } from "@/types/recipe";
import Image from "next/image";
import { EditCountryButton } from "./country-actions";
import { DeleteButton } from "./delete-button";

export default function CountryTable({ countries }: { countries: Country[] }) {
  return (
    <div className="rounded-md border shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow className="hover:bg-muted/60">
            <TableHead className="font-semibold">Flag</TableHead>
            <TableHead className="font-semibold">Name</TableHead>
            <TableHead className="font-semibold">Created At</TableHead>
            <TableHead className="font-semibold">Updated At</TableHead>
            <TableHead className="font-semibold text-right w-24">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {countries.map((country) => (
            <TableRow
              key={country.id}
              className="border-t hover:bg-muted/20 transition-colors"
            >
              <TableCell className="font-medium">
                <Image
                  src={country.flagImage}
                  alt={country.name}
                  width={20}
                  height={20}
                  className="w-8 h-8 rounded-full border border-amber-500"
                />
              </TableCell>

              <TableCell>{country.name}</TableCell>
              <TableCell>{country.createdAt.toLocaleString()}</TableCell>
              <TableCell>{country.updatedAt.toLocaleString()}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <EditCountryButton country={country} />
                  <DeleteButton entityType="country" entityId={country.id} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
