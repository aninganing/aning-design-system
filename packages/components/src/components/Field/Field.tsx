import { Children, cloneElement, createContext, useCallback, useContext, useId, useLayoutEffect, useState } from 'react';
import clsx from 'clsx';
import { field } from './Field.variants';
import styles from './Field.module.css';
import type {
  FieldControlProps,
  FieldErrorProps,
  FieldHelperProps,
  FieldLabelProps,
  FieldRootProps,
} from './Field.types';

type Part = 'helper' | 'error';

interface FieldContextValue {
  controlId: string;
  helperId: string;
  errorId: string;
  required: boolean;
  optional: boolean;
  invalid: boolean;
  parts: Record<Part, boolean>;
  setPart: (part: Part, shown: boolean) => void;
}

const FieldContext = createContext<FieldContextValue | null>(null);

const useField = (name: string) => {
  const context = useContext(FieldContext);
  if (!context) throw new Error(`${name}은(는) Field.Root 안에서 써야 합니다.`);
  return context;
};

// 헬퍼·에러가 실제로 그려졌을 때만 컨트롤의 aria-describedby에 넣도록 Root에 알린다.
const useRegisterPart = (setPart: FieldContextValue['setPart'], part: Part, shown: boolean) => {
  useLayoutEffect(() => {
    if (!shown) return;
    setPart(part, true);
    return () => setPart(part, false);
  }, [setPart, part, shown]);
};

const FieldRoot = ({
  ref,
  className,
  required = false,
  optional = false,
  invalid = false,
  fullWidth,
  ...props
}: FieldRootProps) => {
  const id = useId();
  const [parts, setParts] = useState<Record<Part, boolean>>({ helper: false, error: false });
  const setPart = useCallback(
    (part: Part, shown: boolean) => setParts((prev) => (prev[part] === shown ? prev : { ...prev, [part]: shown })),
    [],
  );

  return (
    <FieldContext
      value={{
        controlId: `${id}-control`,
        helperId: `${id}-helper`,
        errorId: `${id}-error`,
        required,
        optional,
        invalid,
        parts,
        setPart,
      }}
    >
      <div ref={ref} className={clsx(field({ fullWidth }), className)} {...props} />
    </FieldContext>
  );
};

const FieldLabel = ({ ref, className, children, ...props }: FieldLabelProps) => {
  const { controlId, required, optional } = useField('Field.Label');
  return (
    <label ref={ref} htmlFor={controlId} className={clsx(styles.label, className)} {...props}>
      {children}
      {/* 필수 여부는 컨트롤의 required가 전달하므로 *는 읽지 않는다 */}
      {required && (
        <span className={styles.required} aria-hidden="true">
          *
        </span>
      )}
      {optional && !required && <span className={styles.optional}>(선택)</span>}
    </label>
  );
};

const FieldControl = ({ children }: FieldControlProps) => {
  const { controlId, helperId, errorId, required, invalid, parts } = useField('Field.Control');
  const child = Children.only(children);
  const own = child.props as { 'aria-describedby'?: string; required?: boolean };

  return cloneElement(child, {
    id: controlId,
    'aria-describedby':
      clsx(parts.error && errorId, parts.helper && helperId, own['aria-describedby']) || undefined,
    'aria-invalid': invalid || undefined,
    required: required || own.required,
  } as Record<string, unknown>);
};

const FieldHelper = ({ ref, className, ...props }: FieldHelperProps) => {
  const { helperId, invalid, parts, setPart } = useField('Field.Helper');
  // 에러가 보이는 동안에는 헬퍼 대신 에러만 보여준다
  const shown = !(invalid && parts.error);
  useRegisterPart(setPart, 'helper', shown);
  if (!shown) return null;
  return <p ref={ref} id={helperId} className={clsx(styles.helper, className)} {...props} />;
};

const FieldError = ({ ref, className, children, ...props }: FieldErrorProps) => {
  const { errorId, invalid, setPart } = useField('Field.Error');
  const shown = invalid && children != null && children !== '' && children !== false;
  useRegisterPart(setPart, 'error', shown);
  if (!shown) return null;
  return (
    <p ref={ref} id={errorId} className={clsx(styles.error, className)} {...props}>
      {children}
    </p>
  );
};

export const Field = {
  Root: FieldRoot,
  Label: FieldLabel,
  Control: FieldControl,
  Helper: FieldHelper,
  Error: FieldError,
};
