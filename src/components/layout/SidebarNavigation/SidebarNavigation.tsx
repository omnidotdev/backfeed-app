"use client";

import {
  Button,
  Collapsible,
  Divider,
  Flex,
  HStack,
  Stack,
  Text,
  Icon,
  useDisclosure,
} from "@omnidev/sigil";
import { FiChevronRight } from "react-icons/fi";

import { Link } from "components/core";
import { useSidebarNavigationItems } from "lib/hooks";

interface Props {
  /** Close the mobile sidebar when routing. */
  setIsMobileSidebarOpen: (isOpen: boolean) => void;
}

/**
 * Sidebar navigation.
 */
const SidebarNavigation = ({ setIsMobileSidebarOpen }: Props) => {
  const routes = useSidebarNavigationItems();

  const {
    isOpen: isOrganizationContentOpen,
    onToggle: toggleisOrganizationContentOpen,
  } = useDisclosure();

  const { isOpen: isProjectContentOpen, onToggle: toggleisProjectContentOpen } =
    useDisclosure();

  return (
    <Stack mt={4} gap={2} w="full" flex={1}>
      {routes.map(({ href, label, isActive, isCollapsible, children, icon }) =>
        isCollapsible ? (
          <Collapsible
            key={label}
            unmountOnExit
            open={isOrganizationContentOpen}
            onOpenChange={() => {
              toggleisOrganizationContentOpen();
              isProjectContentOpen && toggleisProjectContentOpen();
            }}
            trigger={
              <Button
                justifyContent="space-between"
                variant="ghost"
                backgroundColor="background.subtle"
                w="full"
                color={isActive ? "brand.primary" : "inherit"}
              >
                <HStack>
                  {icon && <Icon src={icon} />}

                  <Text textAlign="left">{label}</Text>
                </HStack>

                <Flex
                  transitionDuration="normal"
                  transform={
                    isOrganizationContentOpen ? "rotate(90deg)" : "none"
                  }
                >
                  <Icon src={FiChevronRight} />
                </Flex>
              </Button>
            }
          >
            <Flex w="full" gap={2}>
              <Divider
                orientation="vertical"
                paddingInline={2}
                ml={2.5}
                h="auto"
              />

              <Stack w="full" flex={1} py={2} pb={0}>
                {children
                  ?.filter(({ isVisible }) => isVisible)
                  .map(
                    ({
                      href,
                      label,
                      isActive,
                      isCollapsible,
                      children,
                      icon,
                    }) =>
                      isCollapsible ? (
                        <Collapsible
                          key={label}
                          unmountOnExit
                          open={isProjectContentOpen}
                          onOpenChange={toggleisProjectContentOpen}
                          trigger={
                            <Button
                              justifyContent="space-between"
                              variant="ghost"
                              backgroundColor="background.subtle"
                              w="full"
                              color={isActive ? "brand.primary" : "inherit"}
                            >
                              <HStack>
                                {icon && <Icon src={icon} />}

                                <Text textAlign="left">{label}</Text>
                              </HStack>

                              <Flex
                                transitionDuration="normal"
                                transform={
                                  isProjectContentOpen
                                    ? "rotate(90deg)"
                                    : "none"
                                }
                              >
                                <Icon src={FiChevronRight} />
                              </Flex>
                            </Button>
                          }
                        >
                          <Flex w="full" gap={2}>
                            <Divider orientation="vertical" w={7} h="auto" />

                            <Stack w="full" flex={1} p={2}>
                              {children
                                ?.filter(
                                  ({ isVisible, href }) => isVisible && !!href
                                )
                                .map(({ href, label, isActive }) => (
                                  <Flex key={label} display="block">
                                    <Link
                                      key={label}
                                      href={href!}
                                      onClick={() =>
                                        setIsMobileSidebarOpen(false)
                                      }
                                    >
                                      <Button
                                        disabled={isActive}
                                        variant="ghost"
                                        tabIndex={-1}
                                        w="full"
                                        justifyContent="left"
                                        color={
                                          isActive ? "brand.primary" : "inherit"
                                        }
                                      >
                                        {label}
                                      </Button>
                                    </Link>
                                  </Flex>
                                ))}
                            </Stack>
                          </Flex>
                        </Collapsible>
                      ) : (
                        <Flex key={label} display="block">
                          {href && (
                            <Link
                              href={href}
                              onClick={() => setIsMobileSidebarOpen(false)}
                            >
                              <Button
                                disabled={isActive}
                                variant="ghost"
                                tabIndex={-1}
                                justifyContent="left"
                                w="full"
                                color={isActive ? "brand.primary" : "inherit"}
                              >
                                {label}
                              </Button>
                            </Link>
                          )}
                        </Flex>
                      )
                  )}
              </Stack>
            </Flex>
          </Collapsible>
        ) : (
          <Flex
            key={label}
            display="block"
            onClick={() => setIsMobileSidebarOpen(false)}
          >
            {href && (
              <Link href={href}>
                <Button
                  disabled={isActive}
                  variant="ghost"
                  tabIndex={-1}
                  w="full"
                  bgColor={{
                    base: "background.subtle",
                    _hover: "background.muted/80",
                  }}
                  color={isActive ? "brand.primary" : "inherit"}
                >
                  {label}
                </Button>
              </Link>
            )}
          </Flex>
        )
      )}
    </Stack>
  );
};

export default SidebarNavigation;
