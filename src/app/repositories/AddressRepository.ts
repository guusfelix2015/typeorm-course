import { ValidationErrorItem } from "joi";
import { Address } from "../entities/Address";
import { AppDataSource } from "../../database/dataSource";
import { ErrorExtension } from "../utils/ErrorExtension";
import addressSchemaValidation from "../utils/validations/AddressSchemaValidation";
import { IAddressInput, IAddressOutput } from "../interfaces/IAddress";

export class AddresRepository {
  private static addressRepository = AppDataSource.getRepository(Address);

  static async getAddress(): Promise<IAddressOutput[]> {
    return this.addressRepository.find({ relations: ["users"] });
  }

  static async newAddress(address: IAddressInput): Promise<IAddressOutput> {
    const { error } = addressSchemaValidation.validate(address, {
      abortEarly: false,
    });

    if (error) {
      const validateErrors = error.details.map(
        (detail: ValidationErrorItem) => detail.message,
      );
      throw new ErrorExtension(validateErrors.join(","), 400);
    }
    return this.addressRepository.save(address);
  }

  static async removeAddress(id: number): Promise<string> {
    await this.addressRepository.delete(id);
    return "Address removed successfully";
  }
}
