import { Card, CardContent } from "@/components/ui/card";
import { Camera, Code2Icon } from "lucide-react";
import Link from "next/link";

type ChallengeListProps = {
  id: string;
  title: string;
  description: string;
  dificulty: string;
  category: string;
  author: string;
  links?: string[];
  starts: number;
};

type ChallengeContextType = {
  challengeList: ChallengeListProps[] | undefined;
  isLoading: boolean;
  page: string;
};

export function CardChallengeList({
  challengeList,
  isLoading,
  page,
}: ChallengeContextType) {
  if (isLoading || !challengeList) {
    return (
      <>
        {[...Array(8)].map((_, index) => (
          <div key={index}>
            <Card className="w-72 2xl:w-80">
              <CardContent className="p-4">
                <div className="animate-pulse flex items-start gap-3 w-full">
                  <div className="rounded-lg p-2 bg-teal-100">
                    <Code2Icon />
                  </div>
                  <div className="space-y-1 w-full truncate">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </>
    );
  }
  return (
    <>
      {challengeList.map((challenge, index) => (
        <Link href={`${page}${challenge.id}`} key={index}>
          <Card className="hover:shadow-lg transition-shadow mb-4 w-72 2xl:w-80">
            <CardContent className="p-4">
              <div className="flex items-start gap-3 w-full">
                <div className="rounded-lg p-2 bg-teal-100">
                  <Code2Icon />
                </div>
                <div className="space-y-1 w-full truncate">
                  <h2 className="text-base font-medium text-blue-950 truncate">
                    {challenge.title}
                  </h2>
                  <div className="flex items-center gap-1 text-gray-500 text-sm">
                    <Camera className="w-4 h-4" />
                    <span className="inline-block">
                      {`Mais de ${
                        challenge.starts === 0
                          ? Math.floor(Math.random() * 3) + 1
                          : challenge.starts
                      } pessoas já começaram`}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </>
  );
}
