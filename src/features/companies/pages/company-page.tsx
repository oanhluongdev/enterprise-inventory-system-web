"use client";

import React, { use, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { FormActions } from "@/types/form-action";
import * as resouces from "@/resources/string-resources.json";
import { CreateUpdateCompanyInputType } from "../server/actions/create-update-company/types";
import { GetCompanyResponse } from "../server/actions/get-company/get-company-response";

interface CompanyPageProps {
  params: Promise<{ action: FormActions; id?: string }>;
  company?: GetCompanyResponse;
}

export const CompanyPage = ({ params, company }: CompanyPageProps) => {
  const paramsResult = use(params);
  const action = paramsResult.action;

  const hookForm = useForm<CreateUpdateCompanyInputType>({
    defaultValues: {
      id: "",
      name: "",
      legalName: "",
      registrationNumber: "",
      taxId: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      phone: "",
      website: "",
      email: "",
      logoUrl: "",
      currencyCode: "",
      timezone: "",
      isActive: true,
    },
  });

  useEffect(() => {
    if (paramsResult.action !== FormActions.Add && company) {
      hookForm.reset({
        id: company.id,
        name: company.name || "",
        legalName: company.legalName || "",
        registrationNumber: company.registrationNumber || "",
        taxId: company.taxId || "",
        address: company.address || "",
        city: company.city || "",
        state: company.state || "",
        postalCode: company.postalCode || "",
        country: company.country || "",
        phone: company.phone || "",
        website: company.website || "",
        email: company.email || "",
        logoUrl: company.logoUrl || "",
        currencyCode: company.currencyCode || "",
        timezone: company.timezone || "",
        isActive: company.isActive,
      });
    }
  }, [company, hookForm, paramsResult.action]);

  const saveData = (data: CreateUpdateCompanyInputType) => {};
  return (
    <Form {...hookForm}>
      <form
        className="flex flex-col gap-y-2"
        onSubmit={hookForm.handleSubmit(saveData)}
      >
        <div className="flex flex-row gap-x-4 pt-4 px-2">
          <div className="flex flex-col gap-y-2 w-[50%]">
            <FormField
              control={hookForm.control}
              name="id"
              render={({ field }) => (
                <FormItem hidden>
                  <FormControl>
                    <Input
                      hidden
                      {...field}
                      value={field.value ?? ""}
                      disabled={true}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={hookForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{resouces.company.name}:</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ""}
                      readOnly={true}
                      className="rounded"
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={hookForm.control}
              name="legalName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{resouces.company.legalName}:</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ""}
                      readOnly={true}
                      className="rounded"
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={hookForm.control}
              name="registrationNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{resouces.company.registrationNumber}:</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ""}
                      readOnly={true}
                      className="rounded"
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={hookForm.control}
              name="taxId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{resouces.company.taxId}:</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ""}
                      readOnly={true}
                      className="rounded"
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={hookForm.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{resouces.company.website}:</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ""}
                      readOnly={true}
                      className="rounded"
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={hookForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{resouces.company.email}:</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ""}
                      readOnly={true}
                      className="rounded"
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={hookForm.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{resouces.company.phone}:</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ""}
                      readOnly={true}
                      className="rounded"
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={hookForm.control}
              name="logoUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{resouces.company.logoUrl}:</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ""}
                      readOnly={true}
                      className="rounded"
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-y-2 w-[50%]">
            <FormField
              control={hookForm.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{resouces.company.address}:</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ""}
                      readOnly={true}
                      className="rounded"
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={hookForm.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{resouces.company.city}:</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ""}
                      readOnly={true}
                      className="rounded"
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={hookForm.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{resouces.company.state}:</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ""}
                      readOnly={true}
                      className="rounded"
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={hookForm.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{resouces.company.country}:</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ""}
                      readOnly={true}
                      className="rounded"
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={hookForm.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{resouces.company.postalCode}:</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ""}
                      readOnly={true}
                      className="rounded"
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={hookForm.control}
              name="currencyCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{resouces.company.currencyCode}:</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ""}
                      readOnly={true}
                      className="rounded"
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={hookForm.control}
              name="timezone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{resouces.company.timezone}:</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ""}
                      readOnly={true}
                      className="rounded"
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={hookForm.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center">
                  <FormLabel>{resouces.company.active}</FormLabel>
                  <FormControl>
                    <Checkbox
                      onCheckedChange={(e) => {
                        if (action !== FormActions.View) {
                          field.onChange(e);
                        }
                      }}
                      checked={field.value ? true : false}
                    />
                  </FormControl>
                  <FormDescription />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex flex-row justify-end mt-4"></div>
      </form>
    </Form>
  );
};
