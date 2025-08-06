import type { FormInstance } from "antd";
import type { CaseRequest } from "../types/case-request";

export class CaseHelper {

    static prepareCaseRequest(form: FormInstance<any>, tags: string[]): CaseRequest {
        const allValues = form.getFieldsValue();
        return {
            name: allValues.name,
            description: allValues.description,
            isAgainstStc: allValues.isAgainstStc || false,
            caseFilingDate: new Date(allValues.caseFilingDate).toISOString().replace('Z', ''),
            caseLevel: allValues.caseLevel,
            internalClient: allValues.internalClient,
            caseType: allValues.caseType,
            lawsuitType: allValues.lawsuitType,
            specializedCourt: allValues.specializedCourt,
            district: allValues.district,
            city: allValues.city,
            litigants: Array.isArray(allValues.litigants) ? allValues.litigants : [],
            additionalConsultants: Array.isArray(allValues.additionalConsultants) ? allValues.additionalConsultants : [],
            tags: tags.map((tag: string) => ({ id: Date.now() + Math.random(), value: tag })),
            caseInformation: { ...allValues.caseInformation, caseNumber: allValues.number },
        };
    }

    static preparePayloadAsFormData(casePayload: CaseRequest, fileList: File[]): FormData {
        const formData = new FormData();
        const { cities, ...districtWithoutCities } = casePayload.district;
        casePayload.district = districtWithoutCities;

        const processValue = (value: any, keyPath: string) => {
            if (value instanceof Date) {
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

        fileList.forEach((file: any, i: number) => {
            formData.append(`documents.files[${i}].file`, file ?? '', file.name ?? '');
            formData.append(`documents.files[${i}].name`, file.name ?? '');
            formData.append(`documents.files[${i}].description`, 'it\'s attachment uploaded from create case');
        });

        return formData;
    }
}