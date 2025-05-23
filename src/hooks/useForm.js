"use client";
import { useCallback, useEffect, useState } from "react";

/**
 * 폼 상태를 생성하고 관리하기 위한 범용 훅
 * @param {Object} config - 설정 객체
 * @param {Object} config.initialFields - 초기 필드 값들
 * @param {Object} config.validators - 각 필드에 대한 유효성 검사 함수들 (utils에서 불러옴)
 * @param {Function} config.onValidationChange - 유효성 검사 상태가 변경될 때 호출되는 선택적 콜백 함수
 * @returns {Object} 폼 상태와 핸들러들
 */

export default function useForm({ initialFields = {}, validators = {}, onValidationChange }) {
  const [fields, setFields] = useState(initialFields);

  const [validation, setValidation] = useState(() => {
    const initialValidation = {};
    Object.keys(initialFields).forEach((fieldName) => {
      initialValidation[fieldName] = {
        isValid: false,
        isTouched: false,
        message: "",
      };
    });
    return initialValidation;
  });

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const allFieldsValid = Object.values(validation).every((field) => field.isValid);
    setIsFormValid(allFieldsValid);

    if (onValidationChange) {
      onValidationChange(validation, allFieldsValid);
    }
  }, [validation, onValidationChange]);

  const handleFieldChange = useCallback(
    (fieldName, value, dependentFields = []) => {
      setFields((prevFields) => ({
        ...prevFields,
        [fieldName]: value,
      }));

      setValidation((prevValidation) => {
        const newValidation = { ...prevValidation };
        if (validators[fieldName]) {
          const result = validators[fieldName](value, fields);
          newValidation[fieldName] = {
            isValid: result.isValid,
            isTouched: true,
            message: result.message || "",
          };
        }

        dependentFields.forEach((depField) => {
          if (validators[depField]) {
            const depValue = fields[depField];
            const updatedFields = { ...fields, [fieldName]: value };
            const result = validators[depField](depValue, updatedFields);
            newValidation[depField] = {
              ...newValidation[depField],
              isValid: result.isValid,
              message: result.message || "",
            };
          }
        });

        return newValidation;
      });
    },
    [fields, validators],
  );

  // Reset form
  const resetForm = useCallback(() => {
    setFields(initialFields);
    setValidation((prev) => {
      const reset = {};
      Object.keys(prev).forEach((field) => {
        reset[field] = { isValid: false, isTouched: false, message: "" };
      });
      return reset;
    });
  }, [initialFields]);

  const getFormState = useCallback(() => {
    return {
      values: fields,
      validation,
      isValid: isFormValid,
    };
  }, [fields, validation, isFormValid]);

  return {
    fields,
    validation,
    isFormValid,
    handleFieldChange,
    resetForm,
    getFormState,
  };
}
