import { faker } from "@faker-js/faker";
import { Factory } from "fishery";
import { OrganizationModel } from "../../../api/organizations/model";

export const organizationFactory = Factory.define<OrganizationModel>(
  ({ onCreate }) => {
    onCreate(async (organization) => {
      const newOrganization = await OrganizationModel.query().insert(
        organization
      );
      return newOrganization;
    });

    return OrganizationModel.fromJson({
      name: faker.company.name(),
    });
  }
);
