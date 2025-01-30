"use client";

import { Select } from "@omnidev/sigil";

import { usePathname, useRouter } from "lib/config/i18n/routing";

interface Props {
  locale: string;
}

const LanguageSelector = ({ locale }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const languageOptions = [
    { value: "en-US", label: "English" },
    { value: "en-ES", label: "Español" },
  ];

  const defaultValue =
    languageOptions.find((option) => option.value === locale)?.value ||
    languageOptions[0].value;

  return (
    <Select
      label={{
        id: "language",
        singular: "Language",
        plural: "Languages",
      }}
      displayClearTrigger={false}
      items={languageOptions}
      collection={languageOptions}
      defaultValue={[defaultValue]}
      onValueChange={({ value }) =>
        router.replace(pathname, { locale: value[0] })
      }
    />
  );
};

export default LanguageSelector;
