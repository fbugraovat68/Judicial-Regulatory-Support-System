import type { FormInstance, UploadFile } from "antd";
import type { CaseRequest } from "../types/case-request";
import { isDayjs } from "dayjs";

export class CaseHelper {

    static prepareCaseRequest(form: FormInstance<any>, tags: string[]): CaseRequest {
        const allValues = form.getFieldsValue();
        return {
            name: allValues.name,
            description: allValues.description,
            isAgainstStc: allValues.isAgainstStc || false,
            caseFilingDate: allValues.caseFilingDate,
            caseLevel: allValues.caseLevel,
            internalClient: allValues.internalClient,
            caseType: allValues.caseType,
            lawsuitType: allValues.lawsuitType,
            specializedCourt: allValues.specializedCourt,
            district: allValues.district,
            city: allValues.city,
            litigants: Array.isArray(allValues.litigants) ? allValues.litigants : [],
            additionalConsultants: Array.isArray(allValues.additionalConsultants) ? allValues.additionalConsultants : [],
            caseInformation: { ...allValues.caseInformation, caseNumber: allValues.number },
            tags
        };
    }

    static preparePayloadAsFormData(casePayload: CaseRequest, fileList: UploadFile[]): FormData {
        const formData = new FormData();
        const { cities, ...districtWithoutCities } = casePayload.district;
        casePayload.district = districtWithoutCities;

        const processValue = (value: any, keyPath: string) => {
            if (value instanceof Date || isDayjs(value)) {
                formData.append(keyPath, value.toISOString().replace('Z', ''));
            } else if (value instanceof Array) {
                value.forEach((item, index) => {
                    processValue(item, `${keyPath}[${index}]`);
                });
            } else if (value && typeof value === 'object') {
                for (const [nestedKey, nestedValue] of Object.entries(value)) {
                    const nestedPath = keyPath ? `${keyPath}.${nestedKey}` : nestedKey;
                    processValue(nestedValue, nestedPath);
                }
            } else {
                formData.append(keyPath, value ?? '');
            }
        };

        for (const [key, value] of Object.entries(casePayload)) {
            processValue(value, key);
        }

        for (let i = 0; i < fileList.length; i++) {
            const file = fileList[i];
            formData.append(`documents.files[${i}].file`, file.originFileObj as Blob, file.name ?? '');
            formData.append(`documents.files[${i}].name`, file.name ?? '');
            formData.append(`documents.files[${i}].description`, 'it\'s attachment uploaded from create case');
        }

        return formData;
    }
}