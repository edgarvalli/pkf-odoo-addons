from dataclasses import dataclass, field, asdict


@dataclass
class Metadata:
    projects: list[dict] = field(default_factory=list)
    entries: list[dict] = field(default_factory=list)
    total_hours: int = 0

    def to_dict(self):
        return asdict(self)
