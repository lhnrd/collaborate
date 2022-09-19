import { faker } from "@faker-js/faker";
import { Factory } from "fishery";
import { OrganizationModel } from "../../../api/organizations/model";

export const organizationFactory = Factory.define<OrganizationModel>(
  ({ onCreate }) => {
    onCreate(async (organization) => {
      const newOrganization = await OrganizationModel.query()
        .insert(organization)
        .returning("*");

      return newOrganization;
    });

    return OrganizationModel.fromJson({
      id: faker.datatype.uuid(),
      name: faker.company.name(),
      createdAt: faker.date.recent().toISOString(),
      updatedAt: faker.helpers.arrayElement([
        faker.date.future().toISOString(),
        null,
      ]),
    });
  }
);
